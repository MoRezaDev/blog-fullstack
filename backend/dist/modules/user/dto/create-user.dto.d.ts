import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    name?: string;
    mobile: string;
    image?: string;
    role?: UserRole;
}
