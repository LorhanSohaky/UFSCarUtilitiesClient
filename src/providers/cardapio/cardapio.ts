import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CardapioProvider {
  private API_URL: string = 'http://localhost:8080';

  constructor(public http: HttpClient) {
    console.log('CardapioProvider Provider');
  }

  getCardapio() {
    return new Promise((resolve, reject) => {
      let url: string = this.API_URL + '/cardapio';
      this.http.get(url).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

}
