import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imagesOptions } from 'src/common/multer/options.multer';
import { VerifyJwtGurd } from 'src/common/gurds/verifyJwtGurd';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(VerifyJwtGurd)
  create(
    @Body(new ValidationPipe()) createPostDto: CreatePostDto,
    @Req() req: Request,
  ) {
    const userId = req['payload'].id;
    return this.postService.create(createPostDto, userId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  //upload images
  @Post('upload-images')
  @UseInterceptors(FilesInterceptor('images', 10, imagesOptions))
  async uploadPostImages(@UploadedFiles() images: Array<Express.Multer.File>) {
    return this.postService.uploadPostImages(images);
  }

  @Post('upload-image-title')
  @UseInterceptors(FileInterceptor('image', imagesOptions))
  async uploadPostImage(@UploadedFile() image: Express.Multer.File) {
    return;
  }

  //For like post
  @Post('like')
  async likePost(@Body() likeDto: { userId: string; postId: string }) {
    return this.postService.likePost(likeDto);
  }

  @Post('unlike')
  async unlikePost(@Body() likeDto: { userId: string; postId: string }) {
    return this.postService.unlikePost(likeDto);
  }

  @Post('find-by-slug')
  async findPostsBySlug(@Body('slug') slug: string) {
    return this.postService.findPostsBySlug(slug);
  }

  @Post('add-comment')
  async addComment(
    @Body(new ValidationPipe()) createCommentDto: CreateCommentDto,
  ) {
    return this.postService.addComment(createCommentDto);
  }

  @Post('add-comment-reply')
  async addCommentReply(
    @Body()
    commentReplyDto: {
      userId: string;
      parentId: string;
      text: string;
      postId: string;
    },
  ) {
    return this.postService.addCommentReply(commentReplyDto);
  }
}
