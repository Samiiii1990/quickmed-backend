import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service'; 
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const db = this.firebaseService.getDatabase();
    const newAppointmentRef = db.ref('appointments').push();
  

    await newAppointmentRef.set({
      id: newAppointmentRef.key,
      ...createAppointmentDto,
    });
  
    const createdAppointment = {
      id: newAppointmentRef.key,
      ...createAppointmentDto,
    };
  
    return createdAppointment; 
  }
  
  async getAppointmentsByPatient(patientId: string) {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('appointments').orderByChild('patientId').equalTo(patientId).once('value');
    return snapshot.val(); 
  }

  async findAppointmentById(id: string) {
    const db = this.firebaseService.getDatabase(); // Get the Firebase database instance
    const snapshot = await db.ref('appointments').child(id).once('value'); // Query the specific appointment by ID
    return snapshot.val(); // Return the appointment data
  }

  async updateAppointment(id: string, appointmentData: any) {
    const db = this.firebaseService.getDatabase();
    const appointmentRef = db.ref('appointments').child(id);

    // Check if the appointment exists
    const snapshot = await appointmentRef.once('value');

    if (!snapshot.exists()) {
        return { success: false, message: 'Appointment not found.' }; // Return if appointment doesn't exist
    }

    // Update the appointment data
    await appointmentRef.update(appointmentData); 
    return { success: true }; // Return success response
}
  async cancelAppointment(id: string) {
    const db = this.firebaseService.getDatabase();
    await db.ref('appointments').child(id).remove(); // Remove the appointment
    return { success: true }; // Return success response
  }

  async getAppointments() {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('appointments').once('value'); // Get all appointments
    return snapshot.val(); // Return all appointment data
  }
}
