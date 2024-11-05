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
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: process.env.FIREBASE_DATABASE_URL,
        })

        return new FirebaseService();
      },
    },
    JwtService,
  ],
  exports: [FirebaseService],
})
export class FirebaseModule { }