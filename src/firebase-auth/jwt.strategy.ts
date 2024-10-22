import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tu_secreto_de_jwt', // Reemplaza con tu secreto });
    });
  }

  async validate(payload: any) {
    return { email: payload.email, uid: payload.uid }; // Aquí puedes devolver más datos si es necesario }
  }
}
