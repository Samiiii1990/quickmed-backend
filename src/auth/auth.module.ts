import { Module } from '@nestjs/common';  
import { JwtModule } from '@nestjs/jwt';  
import { AuthService } from './auth.service';  
import { AuthController } from './auth.controller';  
import { PassportModule } from '@nestjs/passport';  
import { JwtStrategy } from './jwt.strategy';
 // Importar la estrategia JWT  

@Module({  
  imports: [  
    PassportModule,  
    JwtModule.register({  
      secret: 'SECRET_KEY', // Cambia esto por una clave secreta segura  
      signOptions: { expiresIn: '60s' }, // Establece el tiempo de expiración del token  
    }),  
  ],  
  providers: [AuthService, JwtStrategy],  
  controllers: [AuthController],  
})  
export class AuthModule {}
