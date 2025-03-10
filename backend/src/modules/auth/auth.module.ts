import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'this is secret key#$',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
