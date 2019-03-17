import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { CacheService } from 'ionic-cache';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { SigaAuthPage } from '../pages/siga-auth/siga-auth';
import { StorageProvider } from '../providers/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  readonly API_URL = 'https://ufscar-utilities-server.herokuapp.com/';

  private avatarURL: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, cache: CacheService, private auth: AuthProvider, private network: Network, private storage: StorageProvider, private events: Events) {


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      cache.setDefaultTTL(60 * 60 * 4);
      cache.setOfflineInvalidate(false);

      statusBar.styleDefault();
      this.setRootPageAndLoadAvatar();
      splashScreen.hide();
    });
  }

  async setRootPageAndLoadAvatar() {
    this.storage.getStep();
    this.getAvatar();
    this.events.subscribe('storage:step', page => {
      let nextPage = this.getPage(page)
      if (this.network.type != 'none') {
        this.auth.getAuthState().subscribe(user => {
          if (!user) {
            this.rootPage = LoginPage;
            this.storage.setStep('login');
          } else {
            this.rootPage = nextPage;
          }
        });
      } else {
        this.rootPage = nextPage;
      }
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

  getAvatar() {
    this.storage.getRA();
    this.events.subscribe('storage:ra', (ra) => {
      if (ra) {
        this.avatarURL = this.API_URL + 'foto/' + ra;
      }
    });
  }

}
