import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FirebaseService {
  public db: admin.database.Database;

  constructor() {
    this.db = admin.database(); 
  }

  getDatabase() {
    return this.db;
  }
}
