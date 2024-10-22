import { FirebaseService } from './firebase.service';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import { Global, Module } from '@nestjs/common';

dotenv.config();

@Global()
@Module({
  providers: [
    {
      provide: FirebaseService,
      useFactory: () => {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        // Inicializar la aplicación de Firebase solo si no está ya inicializada if (!admin.apps.length) {  
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: process.env.FIREBASE_DATABASE_URL, // Establece la URL de la base de datos });  
        })

        return new FirebaseService();
      },
    },
    JwtService,
  ],
  exports: [FirebaseService],
})
export class FirebaseModule { }