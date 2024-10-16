import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsString()
  doctorId?: string;

  @IsOptional()
  @IsString()
  patientId?: string;

  @IsOptional()
  @IsDate()
  appointmentDate?: Date;

  @IsOptional()
  @IsString()
  appointmentTime?: string;

  @IsOptional()
  @IsEnum(['Scheduled', 'Cancelled', 'Completed'])
  status?: 'Scheduled' | 'Cancelled' | 'Completed';
}

  