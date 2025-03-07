import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/database/database.service';
import { moveImagesToActualPlace } from 'src/common/helper/functions.helper';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostService {
  constructor(private databaseService: DatabaseService) {}
  async create(createPostDto: CreatePostDto, userId: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new HttpException('invalid user id', 400);

    //if post has images
    if (createPostDto.images_url && createPostDto.images_url.length > 0) {
      const newPost = await this.databaseService.post.create({
        data: {
          ...createPostDto,
          slug: createPostDto.title.replace(' ', '-').trim(),
          author: { connect: { id: userId } },
          likes: { create: {} },
        },
      });
      const images_url = moveImagesToActualPlace(
        createPostDto.images_url,
        newPost.id,
      );
      return this.databaseService.post.update({
        where: { id: newPost.id },
        data: { images_url },
      });
    }

    return this.databaseService.post.create({
      data: {
        ...createPostDto,
        slug: createPostDto.title.replace(' ', '-').trim(),
        author: { connect: { id: userId } },
        likes: { create: {} },
      },
    });
  }

  async findAll() {
    return this.databaseService.post.findMany({
      include: {
        author: true,
        comments: { include: { replies: true } },
        likes: true,
      },
    });
  }

  async findOne(id: string) {
    return this.databaseService.post.findUnique({
      where: { id },
      include: { author: true, comments: true, likes: true },
    });
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

  async uploadPostImages(images: Array<Express.Multer.File>) {
    const images_url: string[] = [];
    for (const image of images) {
      images_url.push(`http://localhost:3000/temp/${image.filename}`);
    }
    return images_url;
  }

  //update the Likes
  async likePost(likeDto: { userId: string; postId: string }) {
    const { postId, userId } = likeDto;
    // Check if both user & post exist in one query
    const post = await this.databaseService.post.findUnique({
      where: { id: postId },
      select: { id: true, likes: { include: { users: true } } }, // Include likes & users
    });

    if (!post) throw new HttpException('Invalid post ID', 400);

    // Check if user already liked this post
    if (post.likes?.users.some((user) => user.id === userId)) {
      throw new HttpException('You already liked this post', 400);
    }

    // Update likes: Add user & increment count
    return await this.databaseService.like.update({
      where: { id: post.likes?.id },
      data: {
        likes_count: { increment: 1 }, // Increase likes count
        users: { connect: { id: userId } }, // Add user to liked users
      },
    });
  }

  async unlikePost(likeDto: { userId: string; postId: string }) {
    const { postId, userId } = likeDto;

    const post = await this.databaseService.post.findUnique({
      where: { id: postId },
      select: { id: true, likes: { include: { users: true } } },
    });

    if (!post) throw new HttpException('Invalid post ID', 400);

    // Check if user actually liked the post
    if (!post.likes?.users.some((user) => user.id === userId)) {
      throw new HttpException('You havent liked this post yet', 400);
    }

    // Remove user from likes & decrement count
    return await this.databaseService.like.update({
      where: { id: post.likes.id },
      data: {
        likes_count: { decrement: 1 },
        users: { disconnect: { id: userId } },
      },
    });
  }

  //find posts by slug
  async findPostsBySlug(slug: string) {
    const post = await this.databaseService.post.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    return this.databaseService.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { author: true, comments: true, likes: true },
    });
  }

  //add comment for post
  async addComment(createCommentDto: CreateCommentDto) {
    const post = await this.databaseService.post.findUnique({
      where: { id: createCommentDto.postId },
    });

    if (!post) throw new HttpException('Invalid post ID', 400);

    return this.databaseService.comment.create({ data: createCommentDto });
  }

  async addCommentReply(commentReplyDto: {
    userId: string;
    parentId: string;
    text: string;
    postId: string
  }) {
    const parentExists = await this.databaseService.comment.findUnique({
      where: { id: commentReplyDto.parentId },
    });
    if (!parentExists) throw new HttpException('parent id invalid', 400);
    return this.databaseService.comment.update({
      where: { id: parentExists.id },
      data: {
        replies: {
          create: {
            userId: commentReplyDto.userId,
            text: commentReplyDto.text,
            postId: commentReplyDto.postId,
          },
        },
      },
    });
  }
}
