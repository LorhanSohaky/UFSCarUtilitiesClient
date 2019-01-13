import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ApplicationVerifier } from 'firebase/auth';

@Injectable()
export class AuthProvider {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
    this.user = afAuth.authState;
  }

  createUser(phoneNumber: string, appVerifier: ApplicationVerifier) {
    return this.afAuth.auth.signInWithPhoneNumber(phoneNumber, appVerifier);
  }

}
