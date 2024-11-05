import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FirebaseAuthModule } from './firebase-auth/firebase-auth.module';
import { AuthController } from './firebase-auth/firebase-auth.controller';
import { DoctorsModule } from './doctors/doctors.module';
import { DoctorsController } from './doctors/doctors.controller';
import { DoctorsService } from './doctors/doctors.service';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    AppointmentsModule,
    NotificationsModule,
    FirebaseAuthModule,
    DoctorsModule,
    PatientsModule,
    UsersModule
  ],
  controllers: [AppController, AuthController, DoctorsController],
  providers: [AppService, DoctorsService],
})
export class AppModule { }
