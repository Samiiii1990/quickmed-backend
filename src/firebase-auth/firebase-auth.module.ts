import { Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';  
import { JwtModule } from '@nestjs/jwt';  

@Module({  
 imports: [JwtModule.register({ secret: 'tu_secreto_de_jwt', signOptions: { expiresIn: '1h' } })],  
 providers: [FirebaseAuthService],  
 exports: [FirebaseAuthService],  
})  
export class FirebaseAuthModule {}  