import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from '../firebase/firebase.service';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseAuthService {
  private auth: admin.auth.Auth;

  constructor(
    private readonly jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {
    this.auth = admin.auth();
  }

  async validateToken(idToken: string) {
    try {
      const decodedToken = await this.auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async createUser(email: string, password: string) {
    const userRecord = await this.auth.createUser({
      email,
      password,
    });

    const patientId = uuidv4();

    await this.firebaseService.getDatabase().ref(`/users/${userRecord.uid}`).set({
      email,
      patientId,
    });

    return userRecord;
  }
  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const apiKey = process.env.FIREBASE_API_KEY;
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        },
      );
      const { idToken, localId, email: userEmail } = response.data;

      const user = await this.validateToken(idToken);

      const jwt = await this.generateJwt(user);

      const patientId = await this.getPatientIdByEmail(userEmail); // Nueva función para obtener patientId
      if (!patientId) {
        throw new UnauthorizedException('Patient not found');
      }

      return { access_token: jwt, email: userEmail, uid: localId, patientId };
    } catch (error) {
      console.error('Error logging in with email and password:', error);
      throw new UnauthorizedException('Invalid email or password');
    }
  }


  async getPatientIdByUserId(userId: string): Promise<string | null> {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('patients').orderByChild('userId').equalTo(userId).once('value');

    if (snapshot.exists()) {
      const patients = snapshot.val();
      const patientKeys = Object.keys(patients);
      if (patientKeys.length > 0) {
        return patientKeys[0];
      }
    }
    return null;
  }
  async getPatientIdByEmail(email: string): Promise<string | null> {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('patients').orderByChild('email').equalTo(email).once('value');

    if (snapshot.exists()) {
      const patients = snapshot.val();
      const patientKeys = Object.keys(patients);
      if (patientKeys.length > 0) {
        return patientKeys[0];
      }
    }
    return null;
  }
  async generateJwt(user: any) {
    const payload = { email: user.email, uid: user.uid };
    return this.jwtService.sign(payload);
  }

  async getUserData(uid: string) {
    const userData = await this.firebaseService.getDatabase().ref(`/users/${uid}`).once('value');
    return userData.val();
  }
}
