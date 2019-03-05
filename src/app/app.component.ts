import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { CacheService } from 'ionic-cache';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { SigaAuthPage } from '../pages/siga-auth/siga-auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, cache: CacheService, private auth: AuthProvider, private storage: Storage, private network: Network) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      cache.setDefaultTTL(60 * 60 * 4);
      cache.setOfflineInvalidate(false);

      statusBar.styleDefault();
      this.setRootPage().then(() => {
        splashScreen.hide();
      })
    });
  }

  setRootPage() {
    return this.auth.getPage()
      .then(page => {
        let nextPage = this.getPage(page)
        if (this.network.type != 'none') {
          this.auth.getAuthState().subscribe(user => {
            if (!user) {
              this.rootPage = LoginPage;
              this.storage.set('step', 'login');
            } else {
              this.rootPage = nextPage;
            }
          });
        } else {
          this.rootPage = nextPage;
        }
      })
      .catch(error => {
        console.error('Erro inesperado');
        this.rootPage = LoginPage;
      });
  }

  getPage(page: string) {
    switch (page) {
      case 'tabs':
        return TabsPage
      case 'login':
        return LoginPage
      case 'siga':
        return SigaAuthPage
    }
  }

}
