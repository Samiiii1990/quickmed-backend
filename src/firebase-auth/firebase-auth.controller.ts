import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';  

@Controller('auth')  
export class AuthController {  
 constructor(private readonly firebaseAuthService: FirebaseAuthService) {}  

 @Post('register')  
 async register(@Body('email') email: string, @Body('password') password: string) {  
 return this.firebaseAuthService.createUser(email, password);  
 }  

 @Post('login')  
 async login(@Body('idToken') idToken: string) {  
 const user = await this.firebaseAuthService.verifyIdToken(idToken);  
 if (!user) {  
 throw new UnauthorizedException('Invalid token');  
 }  
 const jwt = await this.firebaseAuthService.generateJwt(user);  
 return { access_token: jwt };  
 }  
}