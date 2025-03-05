import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        mobile: string;
        name: string | null;
        image: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
    }>;
    findAll(): Promise<{
        mobile: string;
        name: string | null;
        image: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        mobile: string;
        name: string | null;
        image: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        mobile: string;
        name: string | null;
        image: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
    }>;
    remove(id: string): Promise<{
        mobile: string;
        name: string | null;
        image: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
    }>;
}
