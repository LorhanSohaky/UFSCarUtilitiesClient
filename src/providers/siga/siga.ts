import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SigaProvider {
  private API_LOGIN_URL: string = 'https://sistemas.ufscar.br/sagui-api/api';
  private API_OTHER_URL: string = 'https://sistemas.ufscar.br/sagui-api/siga';

  constructor(public http: HttpClient) {
    console.log('Hello SigaProvider Provider');
  }

  login(ra: string, pass: string) {
    let data = { username: ra, password: pass };
    return new Promise((resolve, reject) => {
      this.http.post(this.API_LOGIN_URL + '/login', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(response => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });

  }

}
