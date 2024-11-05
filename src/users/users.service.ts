import { Injectable, NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
  private readonly users: any[] = [];

  findUserById(id: string): any {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
}
