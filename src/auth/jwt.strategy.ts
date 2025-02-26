import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import * as passportJwt from 'passport-jwt';

const ExtractJwt = passportJwt.ExtractJwt;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
  }

  validate(payload: { sub: string; email: string; role: string }) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
