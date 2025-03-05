import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { SendOtpDto } from './dto/send-otp.dto';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('send-otp')
  async sendOtp(@Body(new ValidationPipe()) sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body(new ValidationPipe()) verifyOtpDto: VerifyOtpDto,
    @Res() res: Response,
  ) {
    const { access_token } = await this.authService.verifyOtp(verifyOtpDto);
    res.cookie('access_token', access_token).json({ message: 'success' });
  }
}
