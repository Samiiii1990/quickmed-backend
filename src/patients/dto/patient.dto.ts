import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PatientDto {
  @ApiProperty({
    description: 'Nombre del paciente.',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Apellido del paciente.',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del paciente (formato ISO 8601).',
    example: '1980-01-01',
  })
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({
    description: 'Número de teléfono del paciente (opcional).',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber(null)
  phone?: string;

  @ApiProperty({
    description: 'Correo electrónico del paciente.',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
