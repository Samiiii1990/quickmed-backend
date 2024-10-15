import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AuthModule, AppointmentsModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}