import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CacheModule } from 'ionic-cache';
import { MyApp } from './app.component';

import { BibliotecaPage } from '../pages/biblioteca/biblioteca';
import { CardapioPage } from '../pages/cardapio/cardapio';
import { SigaPage } from '../pages/siga/siga';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CardapioProvider } from '../providers/cardapio/cardapio';
import { Network } from '@ionic-native/network';


@NgModule({
  declarations: [
    MyApp,
    BibliotecaPage,
    CardapioPage,
    SigaPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CacheModule.forRoot({ keyPrefix: 'ufscar-utilities-cache' }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BibliotecaPage,
    CardapioPage,
    SigaPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CardapioProvider
  ]
})

export class AppModule { }
