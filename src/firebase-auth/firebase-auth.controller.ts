import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) { }

  @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string) {
    return this.firebaseAuthService.createUser(email, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    try {
      const loginResponse = await this.firebaseAuthService.loginWithEmailAndPassword(email, password);
      return loginResponse;
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
