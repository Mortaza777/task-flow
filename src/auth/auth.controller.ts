import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login-dto';
import { forgerPasswordDto } from './dto/forger-password-dto';
import { resetPasswordDto } from './dto/reset-password-dto';

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
}
