import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @Matches(/^0?9\d{9}$/)
  mobile: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;
}
