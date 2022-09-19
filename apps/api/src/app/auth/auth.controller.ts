import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { UsersEntity } from './model/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  signup(@Body() dto: UsersEntity) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
