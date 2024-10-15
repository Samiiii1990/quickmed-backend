import { Injectable } from '@nestjs/common';  
import { JwtService } from '@nestjs/jwt';  

@Injectable()  
export class AuthService {  
  constructor(private readonly jwtService: JwtService) {}  

  async validateUser(username: string, password: string): Promise<any> {  
    // Aquí deberías validar el usuario en tu base de datos  
    const user = { username: 'test', password: 'test' }; // Reemplaza esto con tu lógica de autenticación real  
    if (user && user.password === password) {  
      const { password, ...result } = user;  
      return result;  
    }  
    return null;  
  }  

  async login(user: any) {  
    const payload = { username: user.username, sub: user.userId };  
    return {  
      access_token: this.jwtService.sign(payload),  
    };  
  }  
}