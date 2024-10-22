import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FirebaseAuthModule } from './firebase-auth/firebase-auth.module';  
import { JwtStrategy } from './firebase-auth/jwt.strategy';
import { AuthController } from './firebase-auth/firebase-auth.controller';
@Module({
  imports: [AppointmentsModule, NotificationsModule,FirebaseAuthModule],
  controllers: [AppController,AuthController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
