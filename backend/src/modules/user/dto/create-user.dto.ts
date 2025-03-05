import { UserRole } from '@prisma/client';
import { IsNotEmpty, Matches } from 'class-validator';



export class CreateUserDto {
  name?: string;

  @IsNotEmpty()
  @Matches(/^0?9\d{9}$/)
  mobile: string;

  image?: string;
  role?: UserRole;
}
