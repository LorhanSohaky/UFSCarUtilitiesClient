import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-siga-auth',
  templateUrl: 'siga-auth.html',
})
export class SigaAuthPage {

  ra: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigaAuthPage');
  }

  format(valString) {
    if (!valString) {
      return '';
    }
    return valString.replace(/[a-zA-Z]+/g, ``);
  }

}
