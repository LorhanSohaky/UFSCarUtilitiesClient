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
import { LoginPage } from '../pages/login/login';
import { SigaAuthPage } from '../pages/siga-auth/siga-auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CardapioProvider } from '../providers/cardapio/cardapio';
import { Network } from '@ionic-native/network';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { CryptoProvider } from '../providers/crypto/crypto';
import { SigaProvider } from '../providers/siga/siga';
import { IonicStorageModule } from '@ionic/storage';
import { StorageProvider } from '../providers/storage/storage';




@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SigaAuthPage,
    BibliotecaPage,
    CardapioPage,
    SigaPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot({
      name: 'ufscar-utilities',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    CacheModule.forRoot({ keyPrefix: 'cache' }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SigaAuthPage,
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
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CardapioProvider,
    AuthProvider,
    DatabaseProvider,
    CryptoProvider,
    SigaProvider,
    StorageProvider
  ]
})

export class AppModule { }
