import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://quickmed-d91e5.web.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, Origin, X-Requested-With'
  });
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de QuickMed')
    .setDescription('Documentación de la API de QuickMed')
    .setVersion('1.0')
    .addTag('QuickMed') // Opcional, para agrupar endpoints
    .addBearerAuth()    // Agrega soporte para autenticación JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}
bootstrap();
