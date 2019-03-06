import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { ApplicationVerifier } from 'firebase/auth';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth, private storage: Storage) {
    this.afAuth.auth.useDeviceLanguage();
  }

  createUser(phoneNumber: string, appVerifier: ApplicationVerifier) {
    return this.afAuth.auth.signInWithPhoneNumber(phoneNumber, appVerifier);
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  async getPage(): Promise<string> {
    return this.storage.get('step')
      .then((step) => {
        if (step != 'login' && step != 'siga' && step != 'tabs') {
          return 'login';
        } else {
          return step;
        }
      }).catch(error => {
        return 'login';
      });
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.storage.clear();
  }
}
