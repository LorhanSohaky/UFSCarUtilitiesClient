import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { CardapioProvider } from '../../providers/cardapio/cardapio';
import { Refeicao } from '../../models/refeicao';

@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {

  private diaSemana: string;

  private domigo: Array<Refeicao>;
  private segunda: Array<Refeicao>;
  private terca: Array<Refeicao>;
  private quarta: Array<Refeicao>;
  private quinta: Array<Refeicao>;
  private sexta: Array<Refeicao>;
  private sabado: Array<Refeicao>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private cardapioProvider: CardapioProvider, private network: Network) {


  }

  ionViewDidLoad() {
    this.getCardapio();
  }

  doRefresh(refresher) {
    this.getCardapio(refresher);
  }

  getCardapio(refresher?) {
    this.diaSemana = this.getDiaAtual();

    this.cardapioProvider.getCardapio()
      .subscribe(
        (response: Refeicao[]) => {
          try {
            this.organizarRefeicoesPorDiaDaSemana(response);
          } catch (error) {
            console.error(error);
            this.toast.create({ message: error, position: 'botton', duration: 3000 }).present();
          }

          if (refresher) {
            refresher.complete();
          }
        }), ((error: any) => {

          let messageError: string;

          if (this.network.type === 'none') {
            messageError = 'Falha de conexão com a internet!';
          } else {
            messageError = 'Erro ao acessar API do cardápio!';
          }

          console.error(messageError);
          this.toast.create({ message: messageError, position: 'botton', duration: 3000 }).present();

          if (refresher) {
            refresher.complete();
          }

        });
  }

  organizarRefeicoesPorDiaDaSemana(refeicoes: Refeicao[]) {
    this.domigo = [];
    this.segunda = [];
    this.terca = [];
    this.quarta = [];
    this.quinta = [];
    this.sexta = [];
    this.sabado = [];

    refeicoes.forEach(refeicao => {
      switch (refeicao['dia-semana']) {
        case 'Domingo':
          this.domigo.push(refeicao);
          break;
        case 'Segunda-feira':
          this.segunda.push(refeicao);
          break;
        case 'Terça-feira':
          this.terca.push(refeicao);
          break;
        case 'Quarta-feira':
          this.quarta.push(refeicao);
          break;
        case 'Quinta-feira':
          this.quinta.push(refeicao);
          break;
        case 'Sexta-feira':
          this.sexta.push(refeicao);
          break;
        case 'Sábado':
          this.sabado.push(refeicao);
          break;
        default:
          throw new Error('Erro ao pegar dados do cardápio, por favor entre em contato com os desenvolvedores');
      }
    });
  }

  getDiaAtual() {
    switch (new Date().getDay()) {
      case 0:
        return 'DOM';
      case 1:
        return 'SEG';
      case 2:
        return 'TER';
      case 3:
        return 'QUA';
      case 4:
        return 'QUI';
      case 5:
        return 'SEX';
      case 6:
        return 'SAB';
    }
  }
}
