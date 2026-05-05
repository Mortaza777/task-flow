import { Injectable } from '@nestjs/common';
import { IsEmail } from 'class-validator';

@Injectable()
export class forgerPasswordDto {
  @IsEmail()
  email!: string;
}
