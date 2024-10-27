import { AuthGuard } from '@nestjs/passport';  
import { Strategy } from 'passport-jwt';  
import { ExtractJwt } from 'passport-jwt';  
import { FirebaseAuthService } from './firebase-auth.service';  
import { Injectable } from '@nestjs/common';

@Injectable()  
export class FirebaseStrategy extends AuthGuard('firebase-token') {  
 constructor(private readonly firebaseAuthService: FirebaseAuthService) {  
 super();  
 }  

 async validate(payload) {  
 const user = await this.firebaseAuthService.validateToken(payload.id);  
 return user;  
 }  
}  

