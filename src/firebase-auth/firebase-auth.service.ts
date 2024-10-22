import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from '../firebase/firebase.service';
import * as admin from 'firebase-admin';
import axios from 'axios';

@Injectable()
export class FirebaseAuthService {
  private auth: admin.auth.Auth;

  constructor(
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {
    this.auth = admin.auth();
  }

  async verifyIdToken(idToken: string) {
    try {
      const decodedToken = await this.auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async createUser(email: string, password: string) {
    return await this.auth.createUser({
      email,
      password,
    });
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
      const user = await this.verifyIdToken(idToken);
      
      // Generate JWT for the session
      const jwt = await this.generateJwt(user);
      
      return { access_token: jwt, email: userEmail, uid: localId };
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
    return userData.val();
  }
}
