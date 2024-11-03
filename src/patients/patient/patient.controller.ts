import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';  
import { PatientDto } from '../dto/patient.dto'; // Asegúrate de importar el DTO  
import { PatientsService } from './patient.service';

@Controller('patients')  
export class PatientController {  
  constructor(private readonly patientsService: PatientsService) {}  

  @Post()  
  create(@Body() patientDto: PatientDto) {  
    return this.patientsService.createPatient(patientDto);  
  }  

  @Get()  
  findAll() {  
    return this.patientsService.getPatients();  
  }  

  @Get(':id')  
  findOne(@Param('id') id: string) {  
    return this.patientsService.findPatientById(id);  
  }  
  @Get(':dni')  
  find(@Param('dni') id: string) {  
    return this.patientsService.getPatientByDni(id);  
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