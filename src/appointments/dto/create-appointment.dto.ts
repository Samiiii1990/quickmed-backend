import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientDni: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  notes?: string;
}