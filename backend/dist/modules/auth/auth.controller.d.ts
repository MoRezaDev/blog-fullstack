import { SendOtpDto } from './dto/send-otp.dto';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    sendOtp(sendOtpDto: SendOtpDto): Promise<{
        id?: string | undefined;
        code?: number | undefined;
        expired_at?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        userId?: string | undefined;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response): Promise<void>;
}
