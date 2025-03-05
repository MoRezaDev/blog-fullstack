"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(databaseService, jwtService) {
        this.databaseService = databaseService;
        this.jwtService = jwtService;
    }
    async sendOtp(sendOtpDto) {
        const user = await this.databaseService.user.findUnique({
            where: { mobile: sendOtpDto.mobile },
        });
        const otp = {
            code: (0, crypto_1.randomInt)(11111, 99999),
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
    async verifyOtp(verifyOtpDto) {
        const user = await this.databaseService.user.findUnique({
            where: { mobile: verifyOtpDto.mobile },
            include: { otp: true },
        });
        if (!user)
            throw new common_1.HttpException('User not found', 404);
        if (user.otp?.code === verifyOtpDto.code &&
            Number(user.otp?.expired_at) > Date.now()) {
            const access_token = this.jwtService.sign({ id: user.id });
            return { access_token };
        }
        else {
            throw new common_1.HttpException('invalid OTP Or otp expired!', 403);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map