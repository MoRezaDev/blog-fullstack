import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        favorite_posts: {
          create: {},
        },
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.user.delete({ where: { id } });
  }

  async addPostsToUserFavorite(userId: string, postId: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      include: { favorite_posts: true },
    });
    if (!user) throw new HttpException('no user found!', 400);

    return await this.databaseService.favoritePost.update({
      where: { id: user.favorite_posts?.id },
      data: {
        posts: {
          connect: { id: postId },
        },
      },
    });
  }

  async removePostsFromUserFavorites(userId: string, postId: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      include: { favorite_posts: true },
    });
    if (!user) throw new HttpException('no user found!', 400);

    return await this.databaseService.favoritePost.update({
      where: { id: user.favorite_posts?.id },
      data: {
        posts: {
          disconnect: { id: postId },
        },
      },
    });
  }
}
