import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';  
import { AuthService } from './auth.service';  
import { LocalAuthGuard } from './local-auth.guard';
 // Crearás esto en un siguiente paso  

@Controller('auth')  
export class AuthController {  
  constructor(private readonly authService: AuthService) {}  

  @UseGuards(LocalAuthGuard) // Añade el guardia local (que también debes implementar)  
  @Post('login')  
  async login(@Request() req) {  
    return this.authService.login(req.user);  
  }  
}