import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { randomInt } from 'crypto';
import { IOtp } from 'src/common/types/types';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async sendOtp(sendOtpDto: SendOtpDto) {
    const user = await this.databaseService.user.findUnique({
      where: { mobile: sendOtpDto.mobile },
    });
    const otp: IOtp = {
      code: randomInt(11111, 99999),
      expired_at: (Date.now() + 60 * 1000).toString(),
    };

    if (!user) {
      const newUser = await this.databaseService.user.create({
        data: {
          mobile: sendOtpDto.mobile,
          otp: { create: otp },
        },
        include: { otp: true },
      });
      return { ...newUser.otp };
    }

    const updatedOtp = await this.databaseService.otp.update({
      where: { userId: user.id },
      data: otp,
    });
    return updatedOtp;
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const user = await this.databaseService.user.findUnique({
      where: { mobile: verifyOtpDto.mobile },
      include: { otp: true },
    });
    if (!user) throw new HttpException('User not found', 404);

    //check otp
    if (
      user.otp?.code === verifyOtpDto.code &&
      Number(user.otp?.expired_at) > Date.now()
    ) {
      const access_token = this.jwtService.sign({ id: user.id });
      return { access_token };
    } else {
      throw new HttpException('invalid OTP Or otp expired!', 403);
    }
  }
}
