import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { DoctorDto } from './dto/doctor.dto';
import { Observable } from 'rxjs';


@Injectable()
export class DoctorsService {
  constructor(private readonly firebaseService: FirebaseService) { }

  async findAll(): Promise<DoctorDto[]> {
    const snapshot = await this.firebaseService.getDatabase().ref('doctors').once('value');
    const doctors = snapshot.val();

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

  getAllDoctors(): Observable<any[]> {
    const db = this.firebaseService.getDatabase();
    return new Observable(observer => {
      db.ref('doctors').once('value', snapshot => {
        if (snapshot.exists()) {
          const doctors = snapshot.val();
          const doctorsArray = Object.values(doctors);
          observer.next(doctorsArray);
        } else {
          observer.error('No doctors found');
        }
        observer.complete();
      });
    });
  }
  async findDoctorById(id: string) {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('doctors').child(id).once('value');
    return snapshot.val();
  }

}
