import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationsService } from './authentications.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { ActiveAccountDto } from './dto/active-account.dto';

@ApiTags('Autenticação - Authentications')
@Controller('authentications')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post()
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    const { email, password, name, office, registration } = signUpUserDto;
    return this.authenticationsService.signUp({
      email,
      password,
      name,
      office,
      registration,
      role: 'user',
    });
  }
  @Post('active-account')
  activeAccount(@Body() data: ActiveAccountDto) {
    const { token } = data;
    return this.authenticationsService.activeAccount({
      token,
    });
  }
  @Post()
  forgotPassword() {
    return this.authenticationsService.forgotPassword();
  }

  @Patch()
  resetPassword(data: { token: string; password: string }) {
    return this.authenticationsService.resetPassword(data);
  }

  @Get(':token')
  RememberPassword(@Param('token') token: string) {
    return this.authenticationsService.rememberPassword(token);
  }
}
