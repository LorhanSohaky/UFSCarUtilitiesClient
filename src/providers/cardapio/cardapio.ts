import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';

@Injectable()
export class CardapioProvider {
  private API_URL: string = 'http://localhost:8080';

  constructor(public http: HttpClient, private cache: CacheService) {
    console.log('CardapioProvider Provider');
  }

  getCardapio() {
    return new Promise((resolve, reject) => {
      let url: string = this.API_URL + '/cardapio';
      let request = this.http.get(url);
      this.cache.loadFromObservable('jsonCardapio', request).subscribe((result: any) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

}
