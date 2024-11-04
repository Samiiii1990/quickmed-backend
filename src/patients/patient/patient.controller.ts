import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';  
import { PatientDto } from '../dto/patient.dto'; // Asegúrate de importar el DTO  
import { PatientsService } from './patient.service';
import { Observable } from 'rxjs';

@Controller('patients')  
export class PatientController {  
  constructor(private readonly patientsService: PatientsService) {}  

  @Post()  
  create(@Body() patientDto: PatientDto) {  
    return this.patientsService.createPatient(patientDto);  
  }  

  @Get()
  getAllPatients(): Observable<any[]> {
    return this.patientsService.getAllPatients();
  }

  @Get(':id')  
  findOne(@Param('id') id: string) {  
    return this.patientsService.findPatientById(id);  
  }  

  @Put(':id')  
  update(@Param('id') id: string, @Body() patientDto: PatientDto) {  
    return this.patientsService.updatePatient(id, patientDto);  
  }  

  @Delete(':id')  
  delete(@Param('id') id: string) {  
    return this.patientsService.deletePatient(id);  
  }  
}