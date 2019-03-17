import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Network } from '@ionic-native/network';
import { User } from '../../providers/database/user';
import { CryptoProvider } from '../../providers/crypto/crypto';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-siga-auth',
  templateUrl: 'siga-auth.html',
})
export class SigaAuthPage {
  @ViewChild('form') private form: NgForm;

  private user: User;
  private password: string;
  private uid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private network: Network, private toast: ToastController,
              private auth: AuthProvider, private storage: StorageProvider, private database: DatabaseProvider) {
    this.user = new User();
  }

  ionViewDidLoad() {

    if (this.network.type == 'none') {
      this.toast.create({ message: 'É necessário estar conectado com a internet', position: 'botton', duration: 3000 }).present();
    }

    this.auth.getAuthState().subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        this.uid = null;
        this.storage.setStep('login');
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
        this.storage.setStep('tabs');
        this.storage.setSiga(encrypted);
        this.storage.setRA(this.user.ra);
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
