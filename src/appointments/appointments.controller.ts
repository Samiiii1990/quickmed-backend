import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  async create(@Body('patientId') patientId: string, @Body() appointmentDto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(patientId, appointmentDto);
  }

  @Get('patients/:patientId')
  async getAppointmentsByPatientId(@Param('patientId') patientId: string) {
    try {
      const appointments = await this.appointmentService.getAppointmentsByPatientId(patientId);
      return appointments;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.appointmentService.findById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')  // Método para actualizar una cita
  async updateAppointment(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto) {
    try {
      await this.appointmentService.updateAppointment(id, updateDto);
      return { message: 'Appointment updated successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    await this.appointmentService.deleteAppointment(id);
    return { message: 'Appointment deleted successfully' };
  }
}
