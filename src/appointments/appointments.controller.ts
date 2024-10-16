import { Controller, Post, Put, Delete, Body, Get, Param } from '@nestjs/common';  
import { AppointmentsService } from './appointments.service';  
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')  
export class AppointmentsController {  
  constructor(private readonly appointmentsService: AppointmentsService) {}  

  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get(':patientId')
  async getAppointments(@Param('patientId') patientId: string) {
    return this.appointmentsService.getAppointmentsByPatient(patientId);
  }

  @Get('appointment/:id') // Endpoint to get appointment by ID
  async getAppointmentById(@Param('id') id: string) {
    return this.appointmentsService.findAppointmentById(id); // Call the service method
  }
  

  @Put(':id')  
  update(@Param('id') id: string, @Body() appointmentData: UpdateAppointmentDto) {  
    return this.appointmentsService.updateAppointment(id, appointmentData);  
  }  

  @Delete(':id')  
  cancel(@Param('id') id: string) {  
    return this.appointmentsService.cancelAppointment(id);  
  }  

  @Get()  
  getAll() {  
    return this.appointmentsService.getAppointments();  
  }  
}
