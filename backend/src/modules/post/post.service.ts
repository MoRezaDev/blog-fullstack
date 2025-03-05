import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostService {
  constructor(private databaseService: DatabaseService) {}
  async create(createPostDto: CreatePostDto, userId: string) {
    return this.databaseService.post.create({
      data: {
        ...createPostDto,
        author: { connect: { id: userId } },
      },
    });
  }

  async findAll() {
    return this.databaseService.post.findMany({
      include: { author: true, comments: true, likes: true },
    });
  }

  async findOne(id: string) {
    return this.databaseService.post.findUnique({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.databaseService.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.post.delete({ where: { id } });
  }

  async uploadPostImages(files: Array<Express.Multer.File>) {
    console.log(files);
    return;
  }
}
