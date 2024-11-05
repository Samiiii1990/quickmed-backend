import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService, FirebaseService],
})
export class DoctorsModule { }
