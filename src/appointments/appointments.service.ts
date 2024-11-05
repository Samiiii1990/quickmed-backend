import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PatientDto } from 'src/patients/dto/patient.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly firebaseService: FirebaseService) { }

  async createAppointment(patientId: string, appointmentDto: CreateAppointmentDto) {
    const patientData = await this.getPatientData(patientId);

    const db = this.firebaseService.getDatabase();
    const newAppointmentRef = db.ref('appointments').push();

    await newAppointmentRef.set({
      id: newAppointmentRef.key,
      patientId,
      patientData,
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
      return [];
    }

    return Object.entries(appointments).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return {
          id: key,
          ...value,
        };
      } else {
        console.error(`Expected an object for appointment value with key ${key}, but got ${typeof value}.`);
        return { id: key };
      }
    });
  }

  async findById(appointmentId: string) {
    const db = this.firebaseService.getDatabase();
    const appointmentRef = db.ref(`appointments/${appointmentId}`);

    const snapshot = await appointmentRef.once('value');
    if (!snapshot.exists()) {
      throw new NotFoundException(`Appointment with ID ${appointmentId} not found`);
    }

    return {
      id: appointmentId,
      ...snapshot.val(),
    };
  }

  async updateAppointment(appointmentId: string, updateDto: UpdateAppointmentDto): Promise<void> {
    const db = this.firebaseService.getDatabase();
    const appointmentRef = db.ref(`appointments/${appointmentId}`);

    const snapshot = await appointmentRef.once('value');
    if (!snapshot.exists()) {
      throw new NotFoundException(`Appointment with ID ${appointmentId} not found`);
    }

    await appointmentRef.update(updateDto);
  }

  async deleteAppointment(appointmentId: string): Promise<void> {
    const db = this.firebaseService.getDatabase();
    const appointmentRef = db.ref(`appointments/${appointmentId}`);

    const snapshot = await appointmentRef.once('value');
    if (!snapshot.exists()) {
      throw new NotFoundException(`Appointment with ID ${appointmentId} not found`);
    }
    await appointmentRef.remove();
  }

}
