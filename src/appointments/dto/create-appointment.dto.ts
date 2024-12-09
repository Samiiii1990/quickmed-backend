import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'DNI del paciente asociado a la cita.', example: '12345678' })
  @IsString()
  @IsNotEmpty()
  patientDni: string;

  @ApiProperty({ description: 'ID del doctor asignado a la cita.', example: 'doctor123' })
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ description: 'Fecha de la cita en formato ISO 8601.', example: '2024-12-09' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Hora de la cita (formato 24 horas).', example: '14:30' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ description: 'Notas adicionales sobre la cita.', example: 'Consulta de seguimiento', required: false })
  @IsString()
  notes?: string;
}
