import { Module } from '@nestjs/common';
import { PatientController } from './patient/patient.controller';
import { PatientsService } from './patient/patient.service';

@Module({
  providers: [PatientsService],
  controllers: [PatientController]
})
export class PatientsModule {}
