import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage';
import { CardapioProvider } from '../../providers/cardapio/cardapio';
import { Refeicao } from '../../models/refeicao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private current_date: Date;
  private refeicaoDeHoje: Refeicao;

  constructor(public navCtrl: NavController, private auth: AuthProvider, private storage: StorageProvider, private cardapio: CardapioProvider, private loadingCtrl: LoadingController) {
    this.current_date = new Date();
  }

  readonly HORARIO_LIMITE_ALMOCO = 15;
  readonly HORARIO_LIMITE_JANTA = 21;

  ionViewDidLoad(){
    this.carregarRefeicao();
  }

  ionViewWillEnter(){
    this.carregarRefeicao();
  }

  carregarRefeicao(){
    this.cardapio.getCardapio().subscribe((refeicoes) => {
      if (this.current_date.getHours() < this.HORARIO_LIMITE_ALMOCO) {
        this.refeicaoDeHoje = refeicoes.filter(refeicao => {
          if (this.formatDate(refeicao.data).getDate() == this.current_date.getDate() && refeicao.refeicao == 'ALMOÇO') {
            return refeicao;
          }
        })[0];
      } else if (this.current_date.getHours() < this.HORARIO_LIMITE_JANTA) {
        this.refeicaoDeHoje = refeicoes.filter(refeicao => {
          if (this.formatDate(refeicao.data).getDate() == this.current_date.getDate() && refeicao.refeicao == 'JANTAR') {
            return refeicao;
          }
        })[0];
      } else {
        this.refeicaoDeHoje = refeicoes.filter(refeicao => {
          let date = this.current_date;
          date.setDate(date.getDate() + 1);
          if (this.formatDate(refeicao.data).getDate() == date.getDate() && refeicao.refeicao == 'ALMOÇO') {
            return refeicao;
          }
        })[0];
      }
    });
  }

  formatDate(stringDate): Date {
    const pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    let arrayDate = stringDate.match(pattern);
    return new Date(arrayDate[3], arrayDate[2] - 1, arrayDate[1]);
  }

  logOut() {
    this.auth.logOut();
    this.storage.setStep('login');
  }

}
