import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { LoginPage } from '../login/login';
import { DatabaseProvider } from '../../providers/database/database';
import { User } from '../../providers/database/user';
import { CryptoProvider } from '../../providers/crypto/crypto';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-siga-auth',
  templateUrl: 'siga-auth.html',
})
export class SigaAuthPage {
  @ViewChild('form') private form: NgForm;

  private user: User;
  private password: string;
  private uid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private auth: AuthProvider, private storage: Storage, private toast: ToastController) {
    this.user = new User();
  }

  ionViewDidLoad() {
    this.user = new User();
    console.log('ionViewDidLoad SigaAuthPage');

    this.auth.getAuthState().subscribe((value) => {
      if (value) {
        this.uid = value.uid;
      } else {
        this.uid = null;
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  format(valString) {
    if (!valString) {
      return '';
    }
    return valString.replace(/[a-zA-Z]+/g, ``);
  }

  login() {
    let toast = this.toast.create({ duration: 3000, position: 'bottom' });

    if (this.form.valid) {
      this.user.ra = this.form.value.ra;
      this.password = this.form.value.password;

      this.user.key = CryptoProvider.generateKey();
      let encrypted = CryptoProvider.encrypt(this.password, this.user.key);

      this.database.addUserInformation(this.uid, this.user).then(() => {
        this.storage.set('siga', encrypted);
        this.navCtrl.setRoot(TabsPage);
      }).catch((error) => {
        console.error(error);
        toast.setMessage('Erro: ' + error);
        toast.present();
      });

    } else {
      toast.setMessage('Erro: formulário inválido!');
      toast.present();
    }
  }

}
