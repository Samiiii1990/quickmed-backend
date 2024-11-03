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
      const userData = await this.getUserData(localId);
      console.log("🚀 ~ FirebaseAuthService ~ loginWithEmailAndPassword ~ userData:", userData)

      return { access_token: jwt, email: userEmail, uid: localId, patientId: userData.patientId };
    } catch (error) {
      console.error('Error logging in with email and password:', error);
      throw new UnauthorizedException('Invalid email or password');
    }
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
