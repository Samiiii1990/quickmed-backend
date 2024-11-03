import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';  
import { AppointmentService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')  
export class AppointmentController {  
  constructor(private readonly appointmentService: AppointmentService) {}  

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
}
