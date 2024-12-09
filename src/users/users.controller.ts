import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el perfil del usuario por ID' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario obtenido exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getUserProfile(@Param('id') id: string): any {
    return this.usersService.findUserById(id);
  }
}
