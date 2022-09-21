import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { SignInDto } from './dto';
import { UsersEntity } from './model/users.entity';
import { USERS_DB } from './model/users.model';

@Injectable({})
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: UsersEntity) {
    const user = USERS_DB.find(x => x.name === dto.name);
    if (user) throw new ForbiddenException('Credentials Taken'); 
    const password = await argon.hash(dto.password);
    try {
       const newUser = USERS_DB.push({...dto, password});
      return newUser;
    } catch (error) {
          throw new Error(error);
    }
  }

  async signin(dto: SignInDto) {
    const user = USERS_DB.find(x => x.name === dto.userName);
    if (!user) throw new ForbiddenException('نام یا رمز عبور اشتباه است');
    // const pwMatch = await argon.verify(user.password, dto.password);
    const pwMatch = user.password === dto.password;
    if (!pwMatch) throw new ForbiddenException('نام یا رمز عبور اشتباه است');
    return this.signToken(user.name);
  }

  async signToken(userName): Promise<{ access_token: string }> {
    const payload = {
      userName,
    };
    // const secret = this.config.get('JWT_SECRET');
    const secret = "asdfghjkl;123456";
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });
    return {
      access_token: token,
    };
  }
}
