import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { NgForm } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('form') private form: NgForm;

  phone: string;

  appVerifier: firebase.auth.RecaptchaVerifier;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private alertCtrl: AlertController, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  sendCode() {
    this.phone = this.form.value.phone;
    let toast = this.toast.create({ duration: 3000, position: 'bottom' });

    if (this.form.valid) {

      this.auth.createUser(this.phone, this.appVerifier)
        .then((confirmationResult) => {

          let prompt = this.alertCtrl.create({
            title: 'Digite o código de confirmação',
            inputs: [{ name: 'codigo', placeholder: 'Código de confirmação' }],
            buttons: [
              {
                text: 'Cancelar',
                handler: data => { console.log('Cancelado'); }
              },
              {
                text: 'Enviar',
                handler: data => {
                  confirmationResult.confirm(data.codigo)
                    .then((result) => {

                      this.navCtrl.setRoot(TabsPage);

                    }).catch((error) => {

                      switch (error.code) {
                        case 'auth/invalid-verification-code':
                          toast.setMessage('Erro: Código de verificação inválido!');
                          break;
                        case 'auth/missing-verification-code':
                          toast.setMessage('Erro: Código de verificação desconhecido!');
                          break;
                        default:
                          toast.setMessage('Erro: ' + error);
                          break;
                      }

                      toast.present();
                      console.error(error);

                    });
                }
              }
            ]
          });
          prompt.present();
        }).catch(function (error) {

          switch (error.code) {
            case 'auth/invalid-phone-number':
              toast.setMessage('Erro: Número de telefone no formato inválido!');
              break;
            case 'auth/missing-phone-number':
              toast.setMessage('Erro: Número de de telefone não reconhecido!');
              break;
            case 'auth/quota-exceeded':
              toast.setMessage('Erro: Cota de SMS execida! Tente mais tarde.');
              break;
            case 'auth/user-disabled':
              toast.setMessage('Erro: Usuário desabilitado!');
              break;
            case 'auth/operation-not-allowed':
              toast.setMessage('Erro: Método de login não habilitado! Favor entrar em contato com os desenvolvedores');
              break;
            default:
              toast.setMessage('Erro: ' + error);
              break;
          }

          toast.present();
          console.log(error);

        });
    } else {
      toast.setMessage('Erro: Formulário inválido');
      console.error('Formulário inválido');

    }
  }
}
