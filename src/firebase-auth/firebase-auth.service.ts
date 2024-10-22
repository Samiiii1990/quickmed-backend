import * as admin from 'firebase-admin'
import { Auth } from 'firebase-admin/auth';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FirebaseAuthService {
  private auth: Auth;

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
    }
  }

  async createUser(email: string, password: string) {
    return await this.auth.createUser({
      email,
      password,
    });
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
