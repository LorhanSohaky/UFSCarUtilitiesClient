import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from './user';

@Injectable()
export class DatabaseProvider {

  constructor(private database: AngularFireDatabase) {
    console.log('Hello DatabaseProvider Provider');
  }

  addUserInformation(uid: string, user: User) {
    return new Promise((resolve, reject) => {
      this.database.database.ref('users/' + uid).set(user).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
