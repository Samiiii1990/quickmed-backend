import { Injectable } from '@nestjs/common';  
import { FirebaseService } from '../../firebase/firebase.service';  
import { PatientDto } from '../dto/patient.dto'; // Asegúrate de crear el DTO correspondiente  

@Injectable()  
export class PatientsService {  
  constructor(private readonly firebaseService: FirebaseService) {}  

  async createPatient(patientDto: PatientDto) {
    const db = this.firebaseService.getDatabase();
    const newPatientRef = db.ref('patients').push();
    await newPatientRef.set({
      id: newPatientRef.key,
      ...patientDto,
    });
    return { id: newPatientRef.key };
  }

  async getPatients() {  
    const db = this.firebaseService.getDatabase();  
    const snapshot = await db.ref('patients').once('value'); // Obtener todos los pacientes  
    return snapshot.val(); // Retornar todos los datos de pacientes  
  }  

  async findPatientById(id: string) {  
    const db = this.firebaseService.getDatabase();  
    const snapshot = await db.ref('patients').child(id).once('value'); // Consultar el paciente específico por ID  
    return snapshot.val(); // Retornar la información del paciente  
  }  

  async findPatientByEmail(email: string) {  
    const db = this.firebaseService.getDatabase();  
    const snapshot = await db.ref('patients').once('value');  
    const patients = snapshot.val();  
    const patient = Object.values(patients).find((patient: any) => patient.email === email);  
  
    return patient || null;
  }

  async updatePatient(id: string, patientData: Partial<PatientDto>) {  
    const db = this.firebaseService.getDatabase();  
    const patientRef = db.ref('patients').child(id);  

    // Comprobar si el paciente existe  
    const snapshot = await patientRef.once('value');  

    if (!snapshot.exists()) {  
      return { success: false, message: 'Paciente no encontrado.' }; // Retornar si el paciente no existe  
    }  

    // Actualizar la información del paciente  
    await patientRef.update(patientData);   
    return { success: true }; // Retornar respuesta de éxito  
  }  

  async deletePatient(id: string) {  
    const db = this.firebaseService.getDatabase();  
    await db.ref('patients').child(id).remove(); // Eliminar el paciente  
    return { success: true }; // Retornar respuesta de éxito  
  }  

  async getPatientByDni(dni: string): Promise<any> {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('patients').once('value');
    const patients = snapshot.val();
  
    // Buscar el paciente por DNI
    const patient = Object.values(patients).find((patient: any) => patient.dni === dni);
  
    return patient || null; // Retorna el paciente o null si no se encuentra
  }
}