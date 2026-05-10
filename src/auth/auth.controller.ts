/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login-dto';
import { forgerPasswordDto } from './dto/forger-password-dto';
import { resetPasswordDto } from './dto/reset-password-dto';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    return this.AuthService.login(LoginDto);
  }

  @Post('forgetPassword')
  forgetPassword(@Body() forgetPasswordDto: forgerPasswordDto) {
    return this.AuthService.ForgetPassword(forgetPasswordDto);
  }

  @Post('resetPassword')
  resetPassword(@Body() resetPasswordDto: resetPasswordDto) {
    return this.AuthService.ResetPassword(resetPasswordDto);
  }

  @Delete('delete-account')
  @UseGuards(JwtAuthGuard)
  deleteAccount(@Request() req) {
    this.AuthService.deleteAccount(req.user.id);
    console.log(req.user)
  }
}

