import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { CacheService } from 'ionic-cache';
import { LoginPage } from '../pages/login/login';
import { SigaAuthPage } from '../pages/siga-auth/siga-auth';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, cache: CacheService, auth: AuthProvider, database: DatabaseProvider, private storage: Storage) {

    let authObserver = auth.getAuthState().subscribe((user) => {
      if (user) {
        this.storage.get('siga').then((key) => {
          if (key) {
            this.storage.set('step', 'tabs');
          } else {
            this.storage.set('step', 'siga');
          }
        });
      } else {
        this.storage.set('step', 'phone');
      }
      authObserver.unsubscribe();
    }, () => {
      this.storage.set('step', 'phone');
    });

    this.storage.get('step').then((value) => {
      if (value == 'phone') {
        this.rootPage = LoginPage;
      } else if (value == 'siga') {
        this.rootPage = SigaAuthPage;
      } else if (value == 'tabs') {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    }).catch(() => {
      this.rootPage = LoginPage;
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      cache.setDefaultTTL(60 * 60 * 4);
      cache.setOfflineInvalidate(false);

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}
