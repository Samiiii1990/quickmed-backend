import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Appointments') // Agrupamos los endpoints bajo la etiqueta 'Appointments'
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva cita',
    description: 'Crea una cita para un paciente dado.',
  })
  @ApiBody({
    type: CreateAppointmentDto,
    description: 'Datos para crear una cita.',
  })
  @ApiResponse({ status: 201, description: 'Cita creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async create(
    @Body('patientId') patientId: string,
    @Body() appointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentService.createAppointment(patientId, appointmentDto);
  }

  @Get('patients/:patientId')
  @ApiOperation({
    summary: 'Obtener citas de un paciente',
    description: 'Obtiene todas las citas de un paciente por su ID.',
  })
  @ApiParam({ name: 'patientId', description: 'ID del paciente.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de citas devuelta con éxito.',
  })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  async getAppointmentsByPatientId(@Param('patientId') patientId: string) {
    try {
      const appointments =
        await this.appointmentService.getAppointmentsByPatientId(patientId);
      return appointments;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una cita por ID',
    description: 'Obtiene los detalles de una cita específica usando su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID de la cita.' })
  @ApiResponse({ status: 200, description: 'Cita encontrada.' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  async findById(@Param('id') id: string) {
    try {
      return await this.appointmentService.findById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una cita',
    description: 'Actualiza los datos de una cita existente.',
  })
  @ApiParam({ name: 'id', description: 'ID de la cita a actualizar.' })
  @ApiBody({
    type: UpdateAppointmentDto,
    description: 'Datos para actualizar la cita.',
  })
  @ApiResponse({ status: 200, description: 'Cita actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  async updateAppointment(
    @Param('id') id: string,
    @Body() updateDto: UpdateAppointmentDto,
  ) {
    try {
      await this.appointmentService.updateAppointment(id, updateDto);
      return { message: 'Appointment updated successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una cita',
    description: 'Elimina una cita por su ID.',
  })
  @ApiParam({ name: 'id', description: 'ID de la cita a eliminar.' })
  @ApiResponse({ status: 200, description: 'Cita eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  async deleteAppointment(@Param('id') id: string) {
    await this.appointmentService.deleteAppointment(id);
    return { message: 'Appointment deleted successfully' };
  }
}
