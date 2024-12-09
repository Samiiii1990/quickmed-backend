import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppointmentDto {
  @ApiProperty({ description: 'ID del doctor asignado.', example: 'doctor123', required: false })
  @IsOptional()
  @IsString()
  doctorId?: string;

  @ApiProperty({ description: 'ID del paciente asociado.', example: 'patient456', required: false })
  @IsOptional()
  @IsString()
  patientId?: string;

  @ApiProperty({ description: 'Nueva fecha de la cita.', example: '2024-12-10', required: false })
  @IsOptional()
  @IsDate()
  appointmentDate?: Date;

  @ApiProperty({ description: 'Nueva hora de la cita.', example: '10:00', required: false })
  @IsOptional()
  @IsString()
  appointmentTime?: string;

  @ApiProperty({
    description: 'Estado actual de la cita.',
    example: 'Scheduled',
    required: false,
    enum: ['Scheduled', 'Cancelled', 'Completed'],
  })
  @IsOptional()
  @IsEnum(['Scheduled', 'Cancelled', 'Completed'])
  status?: 'Scheduled' | 'Cancelled' | 'Completed';
}
