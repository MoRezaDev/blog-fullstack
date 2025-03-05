import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [DatabaseModule]
})
export class PostModule {}
