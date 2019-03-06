import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private auth: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logOut() {
    this.auth.logOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
