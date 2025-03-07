import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyJwtGurd } from 'src/common/gurds/verifyJwtGurd';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //add and update favoritePosts
  @Post('add-to-favorite')
  async addPostsToUserFavorite(userId: string, postId: string) {
    return this.userService.addPostsToUserFavorite(userId, postId);
  }

  @Post('remove-from-favorite')
  async removePostsFromUserFavorites(userId: string, postId: string) {
    return this.userService.addPostsToUserFavorite(userId, postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
