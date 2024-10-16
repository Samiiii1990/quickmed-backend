import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FirebaseService {
  public db: admin.database.Database;

  constructor() {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    // Initialize Firebase App
    if (!admin.apps.length) { // Check if app is already initialized
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL, // Set database URL if needed
      });
    }

    // Initialize the Database after Firebase app is initialized
    this.db = admin.database();
    
  }
  getDatabase() {
    return admin.database();
  }
}
