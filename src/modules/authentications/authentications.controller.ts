import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationsService } from './authentications.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { ActiveAccountDto } from './dto/active-account.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('Autenticação - Authentications')
@Controller('authentications')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post()
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    const { email, name, office, registration } = signUpUserDto;
    return this.authenticationsService.signUp({
      email,
      name,
      office,
      registration,
    });
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return this.authenticationsService.login({
      email,
      password,
    });
  }
  @Post('active-account')
  activeAccount(@Body() data: ActiveAccountDto) {
    const { token, password } = data;
    return this.authenticationsService.activeAccount({
      token,
      password,
    });
  }
  @Post('forgot-password')
  forgotPassword(@Body() data: ForgotPasswordDto) {
    const { email } = data;
    return this.authenticationsService.forgotPassword({ email });
  }

  @Get('forgot-password/:token')
  rememberPassword(@Param('token') token: string) {
    return this.authenticationsService.rememberPassword({ token });
  }

  @Patch('reset-password')
  resetPassword(@Body() data: { token: string; password: string }) {
    const { token, password } = data;
    return this.authenticationsService.resetPassword({ token, password });
  }
}
