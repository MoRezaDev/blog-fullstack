import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule,
    ServeStaticModule.forRoot({
      rootPath: './src/public',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
