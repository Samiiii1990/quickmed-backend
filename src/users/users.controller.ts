import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':id')
  getUserProfile(@Param('id') id: string): any {
    return this.usersService.findUserById(id);
  }
}
