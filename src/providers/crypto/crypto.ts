import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CryptoProvider {

  constructor() {
    console.log('Hello CryptoProvider Provider');
  }

  static generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static encrypt(data: string, key: string) {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  static decrypt(data: string, key: string) {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
  }

}
