import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Refeicao } from '../../models/refeicao';
import { Observable } from 'rxjs';

@Injectable()
export class CardapioProvider {
  private API_URL: string = 'https://ufscar-utilities-server.herokuapp.com';

  constructor(public http: HttpClient, private cache: CacheService) {
    console.log('CardapioProvider Provider');
  }

  getCardapio(): Observable<Refeicao[]> {
    const url: string = this.API_URL + '/cardapio';
    return this.cache.loadFromObservable('jsonCardapio', this.http.get(url));
  }

}
