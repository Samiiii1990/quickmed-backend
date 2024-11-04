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
  
    // Generar un patientId único
    const patientId = uuidv4(); // Genera un UUID como patientId
  
    // Guardar el usuario en la base de datos junto con el patientId
    await this.firebaseService.getDatabase().ref(`/users/${userRecord.uid}`).set({
      email,
      patientId, // Almacena el patientId asociado al usuario
    });
  
    return userRecord; // Retorna el userRecord si es necesario
  }

  // New method to login with email and password using Firebase REST API
  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const apiKey = process.env.FIREBASE_API_KEY; // Firebase web API key
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        },
      );
      const { idToken, localId, email: userEmail } = response.data;
      
      // Verify the token to get the user information
      const user = await this.validateToken(idToken);
      
      // Generate JWT for the session
      const jwt = await this.generateJwt(user);
      
      // Obtener patientId asociado en la colección patients
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
  
  // Nueva función para obtener el patientId desde la colección patients
  async getPatientIdByUserId(userId: string): Promise<string | null> {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('patients').orderByChild('userId').equalTo(userId).once('value');
    
    if (snapshot.exists()) {
      const patients = snapshot.val();
      const patientKeys = Object.keys(patients);
      if (patientKeys.length > 0) {
        return patientKeys[0]; // Retorna el primer patientId encontrado
      }
    }
    return null; // Si no se encuentra, retorna null
  }
  async getPatientIdByEmail(email: string): Promise<string | null> {
    const db = this.firebaseService.getDatabase();
    const snapshot = await db.ref('patients').orderByChild('email').equalTo(email).once('value');
  
    console.log("🚀 ~ getPatientIdByEmail ~ snapshot.val():", snapshot.val()); // Para depuración
  
    if (snapshot.exists()) {
      const patients = snapshot.val();
      const patientKeys = Object.keys(patients);
      if (patientKeys.length > 0) {
        return patientKeys[0]; // Retorna el primer patientId encontrado
      }
    }
    return null; // Si no se encuentra, retorna null
  }
  async generateJwt(user: any) {
    const payload = { email: user.email, uid: user.uid };
    return this.jwtService.sign(payload);
  }

async getUserData(uid: string) {
    const userData = await this.firebaseService.getDatabase().ref(`/users/${uid}`).once('value');
    return userData.val(); // Verifica que esto devuelva el objeto que esperas
}
}
