import { Injectable, NotFoundException } from '@nestjs/common';  
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PatientDto } from 'src/patients/dto/patient.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()  
export class AppointmentService {  
  constructor(private readonly firebaseService: FirebaseService) {}  

  async createAppointment(patientId: string, appointmentDto: CreateAppointmentDto) {
    // Obtener los datos del paciente
    const patientData = await this.getPatientData(patientId);
    
    // Aquí puedes usar patientData para cualquier lógica adicional que necesites al crear la cita
    const db = this.firebaseService.getDatabase();
    const newAppointmentRef = db.ref('appointments').push();
    
    // Guarda la cita junto con los datos del paciente
    await newAppointmentRef.set({
      id: newAppointmentRef.key,
      patientId,
      patientData,  // Incluye los datos del paciente si es necesario
      ...appointmentDto,
    });

    return { id: newAppointmentRef.key };
  }

  private async getPatientData(patientId: string): Promise<PatientDto> {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('patients').child(patientId).once('value');

    if (!snapshot.exists()) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    return snapshot.val();
  }
  async getAppointmentsByPatientId(patientId: string) {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('appointments').orderByChild('patientId').equalTo(patientId).once('value');

    const appointments = snapshot.val();
    if (!appointments) {
        return []; // Retorna un array vacío si no hay citas
    }

    // Aseguramos que `appointments` es un objeto antes de hacer el spread
    return Object.entries(appointments).map(([key, value]) => {
        // Verificamos que value es un objeto para evitar el error de propagación
        if (typeof value === 'object' && value !== null) {
            return {
                id: key,
                ...value, // Usamos el spread operator aquí
            };
        } else {
            // Manejo de error si value no es un objeto
            console.error(`Expected an object for appointment value with key ${key}, but got ${typeof value}.`);
            return { id: key }; // Devuelve al menos el id
        }
    });
}
  
}
