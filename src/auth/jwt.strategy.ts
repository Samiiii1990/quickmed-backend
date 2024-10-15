import { Injectable } from '@nestjs/common';  
import { PassportStrategy } from '@nestjs/passport';  
import { ExtractJwt, Strategy } from 'passport-jwt'; // Asegúrate de importar Strategy de passport-jwt  

@Injectable()  
export class JwtStrategy extends PassportStrategy(Strategy) {  
  constructor() {  
    super({  
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  
      ignoreExpiration: false,  
      secretOrKey: 'your-secret-key', // Asegúrate de que esta sea tu clave secreta  
    });  
  }  

  async validate(payload: any) {  
    // Lógica para validar el payload del JWT  
    return { userId: payload.sub, username: payload.username };  
  }  
}