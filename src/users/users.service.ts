import { Injectable, NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
  private readonly users: any[] = []; // Aquí deberías obtener tus usuarios de la base de datos

  // Método para obtener un usuario por ID
  findUserById(id: string): any {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
}
