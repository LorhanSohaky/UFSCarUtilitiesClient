import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApplicationVerifier } from 'firebase/auth';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth, private storage: StorageProvider) {
    this.afAuth.auth.useDeviceLanguage();
  }

  createUser(phoneNumber: string, appVerifier: ApplicationVerifier) {
    return this.afAuth.auth.signInWithPhoneNumber(phoneNumber, appVerifier);
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.storage.clear();
  }
}
