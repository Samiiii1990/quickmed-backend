import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications') // Agrupa los endpoints bajo la etiqueta 'Notifications'
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('push')
  @ApiOperation({
    summary: 'Enviar notificación push',
    description: 'Envía una notificación push a un dispositivo específico utilizando su token.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'device-token-123', description: 'Token del dispositivo destinatario.' },
        title: { type: 'string', example: 'Nueva Notificación', description: 'Título de la notificación.' },
        body: { type: 'string', example: 'Este es el cuerpo de la notificación.', description: 'Contenido de la notificación.' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Notificación push enviada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async sendPushNotification(
    @Body('token') token: string,
    @Body('title') title: string,
    @Body('body') body: string,
  ) {
    return this.notificationsService.sendPushNotification(token, title, body);
  }

  @Post('webhook')
  @ApiOperation({
    summary: 'Enviar notificación por webhook',
    description: 'Envía un webhook a una URL especificada con el payload proporcionado.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'https://example.com/webhook', description: 'URL del webhook.' },
        payload: {
          type: 'object',
          example: { message: 'Hello, webhook!' },
          description: 'Contenido del payload enviado al webhook.',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Webhook enviado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async sendWebhook(@Body('url') url: string, @Body('payload') payload: any) {
    return this.notificationsService.sendWebhook(url, payload);
  }
}
