import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ApplicationVerifier } from 'firebase/auth';

@Injectable()
export class AuthProvider {

  user: User;

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
    afAuth.auth.useDeviceLanguage();
  }

  createUser(phoneNumber: string, appVerifier: ApplicationVerifier) {
    return this.afAuth.auth.signInWithPhoneNumber(phoneNumber, appVerifier);
  }

  getUser() {
    return this.afAuth.authState;
  }

}
