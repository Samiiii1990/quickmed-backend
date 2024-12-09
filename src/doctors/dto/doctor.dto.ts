import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class DoctorDto {
  @ApiProperty({ description: 'ID único del doctor.', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Nombre completo del doctor.', example: 'Dr. John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Especialización del doctor.', example: 'Cardiología' })
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @ApiProperty({ description: 'Correo electrónico del doctor.', example: 'johndoe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
