import { Module } from '@nestjs/common';

import { FirebaseModule } from 'src/firebase/firebase.module';
import { AppointmentService } from './appointments.service';
import { AppointmentController } from './appointments.controller';

@Module({
  imports: [FirebaseModule],
  providers: [AppointmentService],
  controllers: [AppointmentController]
})
export class AppointmentsModule {}
