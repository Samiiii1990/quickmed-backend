import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  doctorName: string;

  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @IsDateString()
  date: string; // Use ISO 8601 format (e.g., "2024-10-16")

  @IsString()
  @IsNotEmpty()
  time: string; // You might want to define a more specific format for time

  @IsString()
  @IsNotEmpty()
  status: string; // Possible values: "Scheduled", "Completed", etc.

  @IsString()
  notes?: string; // This field can be optional
}