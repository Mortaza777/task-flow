import { Injectable } from '@nestjs/common';
import { IsNotEmpty, MinLength } from 'class-validator';

@Injectable()
export class resetPasswordDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @MinLength(8)
  newpassword: string;

  @IsNotEmpty()
  confirmPassword: string;
}
