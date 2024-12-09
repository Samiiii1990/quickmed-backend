import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PatientDto } from '../dto/patient.dto';
import { PatientsService } from './patient.service';
import { Observable } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Patients') // Agrupamos los endpoints bajo la etiqueta "Patients"
@Controller('patients')
export class PatientController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo paciente', description: 'Registra un nuevo paciente en el sistema.' })
  @ApiBody({ type: PatientDto, description: 'Datos del paciente a registrar.' })
  @ApiResponse({ status: 201, description: 'Paciente creado exitosamente.', type: PatientDto })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  create(@Body() patientDto: PatientDto) {
    return this.patientsService.createPatient(patientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pacientes', description: 'Devuelve una lista de todos los pacientes registrados.' })
  @ApiResponse({ status: 200, description: 'Lista de pacientes devuelta con éxito.', type: [PatientDto] })
  getAllPatients(): Observable<any[]> {
    return this.patientsService.getAllPatients();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paciente por ID', description: 'Devuelve los datos de un paciente basado en su ID.' })
  @ApiParam({ name: 'id', description: 'ID único del paciente.', example: '123' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado.', type: PatientDto })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findPatientById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de un paciente', description: 'Actualiza la información de un paciente basado en su ID.' })
  @ApiParam({ name: 'id', description: 'ID único del paciente.', example: '123' })
  @ApiBody({ type: PatientDto, description: 'Nuevos datos del paciente.' })
  @ApiResponse({ status: 200, description: 'Paciente actualizado exitosamente.', type: PatientDto })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  update(@Param('id') id: string, @Body() patientDto: PatientDto) {
    return this.patientsService.updatePatient(id, patientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un paciente', description: 'Elimina los datos de un paciente basado en su ID.' })
  @ApiParam({ name: 'id', description: 'ID único del paciente.', example: '123' })
  @ApiResponse({ status: 200, description: 'Paciente eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  delete(@Param('id') id: string) {
    return this.patientsService.deletePatient(id);
  }
}
