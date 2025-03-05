import { DatabaseService } from 'src/database/database.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private databaseService;
    private jwtService;
    constructor(databaseService: DatabaseService, jwtService: JwtService);
    sendOtp(sendOtpDto: SendOtpDto): Promise<{
        id?: string | undefined;
        code?: number | undefined;
        expired_at?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        userId?: string | undefined;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        access_token: string;
    }>;
}
