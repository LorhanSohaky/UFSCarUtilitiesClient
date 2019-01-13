import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
