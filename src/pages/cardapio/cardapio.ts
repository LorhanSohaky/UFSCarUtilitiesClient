import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { CardapioProvider } from '../../providers/cardapio/cardapio';

@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {

  private diaSemana: string;

  private domigo: Array<{ 'data': string, 'dia-semana': string, 'refeicao': string, 'prato': string, 'guarnicao': string, 'arroz': string, 'feijao': string, 'salada': string, 'sobremesa': string }>;
  private segunda: Array<{ 'data': string, 'dia-semana': string, 'refeicao': string, 'prato': string, 'guarnicao': string, 'arroz': string, 'feijao': string, 'salada': string, 'sobremesa': string }>;
  private terca: Array<{ 'data': string, 'dia-semana': string, 'refeicao': string, 'prato': string, 'guarnicao': string, 'arroz': string, 'feijao': string, 'salada': string, 'sobremesa': string }>;
  private quarta: Array<{ 'data': string, 'dia-semana': string, 'refeicao': string, 'prato': string, 'guarnicao': string, 'arroz': string, 'feijao': string, 'salada': string, 'sobremesa': string }>;
  private quinta: Array<{ 'data': string, 'dia-semana': string, 'refeicao': string, 'prato': string, 'guarnicao': string, 'arroz': string, 'feijao': string, 'salada': string, 'sobremesa': string }>;
  private sexta: Array<{ 'data': string, 'dia-semana': string, 'refeicao': string, 'prato': string, 'guarnicao': string, 'arroz': string, 'feijao': string, 'salada': string, 'sobremesa': string }>;
  private sabado: Array<{ 'data': string, 'dia-semana': string, 'refeicao': string, 'prato': string, 'guarnicao': string, 'arroz': string, 'feijao': string, 'salada': string, 'sobremesa': string }>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, public cardapioProvider: CardapioProvider, private network: Network) {

    switch (new Date().getDay()) {
      case 0:
        this.diaSemana = 'DOM';
        break;
      case 1:
        this.diaSemana = 'SEG';
        break;
      case 2:
        this.diaSemana = 'TER';
        break;
      case 3:
        this.diaSemana = 'QUA';
        break;
      case 4:
        this.diaSemana = 'QUI';
        break;
      case 5:
        this.diaSemana = 'SEX';
        break;
      case 6:
        this.diaSemana = 'SAB';
        break;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardapioPage');
    this.getCardapio();
  }

  doRefresh(refresher) {
    this.getCardapio(refresher);
  }

  getCardapio(refresher?) {
    console.log('Carregando cardápio');

    this.cardapioProvider.getCardapio().then((result: any) => {
      this.domigo = [];
      this.segunda = [];
      this.terca = [];
      this.quarta = [];
      this.quinta = [];
      this.sexta = [];
      this.sabado = [];
      result.forEach(element => {
        switch (element['dia-semana']) {
          case 'Domingo':
            this.domigo.push(element);
            break;
          case 'Segunda-feira':
            this.segunda.push(element);
            break;
          case 'Terça-feira':
            this.terca.push(element);
            break;
          case 'Quarta-feira':
            this.quarta.push(element);
            break;
          case 'Quinta-feira':
            this.quinta.push(element);
            break;
          case 'Sexta-feira':
            this.sexta.push(element);
            break;
          case 'Sábado':
            this.sabado.push(element);
            break;
          default:
            let messageError: string = 'Erro ao pegar dados do cardápio';
            console.error(messageError);
            this.toast.create({ message: messageError, position: 'botton', duration: 3000 }).present();
        }

        if (refresher) {
          refresher.complete();
        }

      });
    }).catch((error: any) => {

      let messageError: string;

      if (this.network.type === 'none') {
        messageError = 'Erro de conexão com a internet';
      } else {
        messageError = 'Erro ao acessar API do cardápio';
      }

      console.error(messageError);
      this.toast.create({ message: messageError, position: 'botton', duration: 3000 }).present();

      if (refresher) {
        refresher.complete();
      }

    });
  }
}
