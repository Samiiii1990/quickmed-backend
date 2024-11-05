import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: FirebaseAuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const decoded = this.authService.validateToken(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token no válido');
    }
  }
}
