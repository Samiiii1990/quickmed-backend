import { Injectable } from '@nestjs/common';  
import { FirebaseService } from 'src/firebase/firebase.service';


@Injectable()  
export class AppointmentsService {  
  constructor(private firebaseService: FirebaseService) {}
  private readonly appointmentsRef = this.firebaseService.db.ref('appointments');

  async createAppointment(appointmentData: any): Promise<any> {  
    const newAppointmentRef = this.appointmentsRef.push();  
    await newAppointmentRef.set(appointmentData);  
    return { id: newAppointmentRef.key, ...appointmentData };  
  }  

  async updateAppointment(appointmentId: string, appointmentData: any): Promise<void> {  
    await this.appointmentsRef.child(appointmentId).update(appointmentData);  
  }  

  async cancelAppointment(appointmentId: string): Promise<void> {  
    await this.appointmentsRef.child(appointmentId).remove();  
  }  

  async getAppointments(): Promise<any[]> {  
    const snapshot = await this.appointmentsRef.once('value');  
    return snapshot.val() ? Object.values(snapshot.val()) : [];  
  }  
}