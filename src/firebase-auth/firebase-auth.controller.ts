import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FirebaseAuthService } from './firebase-auth.service';

@ApiTags('Authentication') // Agrupa los endpoints bajo la categoría 'Authentication'
@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario', description: 'Crea un nuevo usuario con un correo y contraseña.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com', description: 'Correo electrónico del usuario' },
        password: { type: 'string', example: 'securePassword123', description: 'Contraseña del usuario' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida o error en los datos.' })
  async register(@Body('email') email: string, @Body('password') password: string) {
    return this.firebaseAuthService.createUser(email, password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión', description: 'Permite a un usuario iniciar sesión con correo y contraseña.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com', description: 'Correo electrónico del usuario' },
        password: { type: 'string', example: 'securePassword123', description: 'Contraseña del usuario' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Correo o contraseña incorrectos.' })
  async login(@Body('email') email: string, @Body('password') password: string) {
    try {
      const loginResponse = await this.firebaseAuthService.loginWithEmailAndPassword(email, password);
      return loginResponse;
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
