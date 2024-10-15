import { Controller, Post, Body } from '@nestjs/common';  
import { NotificationsService } from './notifications.service';  

@Controller('notifications')  
export class NotificationsController {  
  constructor(private readonly notificationsService: NotificationsService) {}  

  @Post('push')  
  async sendPushNotification(  
    @Body('token') token: string,  
    @Body('title') title: string,  
    @Body('body') body: string,  
  ) {  
    return this.notificationsService.sendPushNotification(token, title, body);  
  }  

  @Post('webhook')  
  async sendWebhook(  
    @Body('url') url: string,  
    @Body('payload') payload: any  
  ) {  
    return this.notificationsService.sendWebhook(url, payload);  
  }  
}