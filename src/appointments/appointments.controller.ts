import { Controller, Post, Put, Delete, Body, Get, Param } from '@nestjs/common';  
import { AppointmentsService } from './appointments.service';  

@Controller('appointments')  
export class AppointmentsController {  
  constructor(private readonly appointmentsService: AppointmentsService) {}  

  @Post()  
  create(@Body() appointmentData: any) {  
    return this.appointmentsService.createAppointment(appointmentData);  
  }  

  @Put(':id')  
  update(@Param('id') id: string, @Body() appointmentData: any) {  
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
