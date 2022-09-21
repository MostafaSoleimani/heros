import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USERS_DB } from '../model/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "asdfghjkl;123456",
    });
  }

  async validate(payload: { userName: string }) {
    const user = USERS_DB.find(x => x.name === payload.userName);
    delete user.password;
    return user;
  }
}
