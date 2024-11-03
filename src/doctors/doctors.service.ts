// doctors.service.ts
import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service'; // Adjust the path as necessary
import { DoctorDto } from './dto/doctor.dto';


@Injectable()
export class DoctorsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll(): Promise<DoctorDto[]> {
    const snapshot = await this.firebaseService.getDatabase().ref('doctors').once('value');
    const doctors = snapshot.val();
    
    // Convert object to array of DoctorDto
    return Object.keys(doctors).map(key => ({
      id: key,
      ...doctors[key],
    })) as DoctorDto[];
  }

  async create(doctorDto: DoctorDto): Promise<DoctorDto> {
    const newDoctorRef = this.firebaseService.getDatabase().ref('doctors').push();
    await newDoctorRef.set(doctorDto);
    
    return { id: newDoctorRef.key, ...doctorDto };
  }

  // Optionally, implement other methods (update, delete, findOne, etc.)
}
