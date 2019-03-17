import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private auth: AuthProvider, private storage: StorageProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logOut() {
    this.auth.logOut();
    this.storage.setStep('login');
  }

}
