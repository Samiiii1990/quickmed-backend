import { Injectable } from '@nestjs/common';  
import axios from 'axios';
import * as admin from 'firebase-admin';  

@Injectable()  
export class NotificationsService {  
  constructor() {  
    // Asegúrate de que Firebase se haya inicializado  
  }  

  async sendPushNotification(token: string, title: string, body: string) {  
    const message = {  
      notification: {  
        title: title,  
        body: body,  
      },  
      token: token,  
    };  

    try {  
      const response = await admin.messaging().send(message);  
      console.log('Successfully sent message:', response);  
      return response;  
    } catch (error) {  
      console.error('Error sending message:', error);  
      throw new Error('Could not send message.');  
    }  
  }  

  async sendWebhook(url: string, payload: any) {  
    try {  
      const response = await axios.post(url, payload);  
      return response.data;  
    } catch (error) {  
      console.error('Error sending webhook:', error);  
      throw new Error('Could not send webhook.');  
    }  
  }  
}