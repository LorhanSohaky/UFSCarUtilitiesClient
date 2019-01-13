import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { CacheService } from 'ionic-cache';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, cache: CacheService, afAuth: AngularFireAuth) {
    afAuth.auth.useDeviceLanguage();
    const authObserver = afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user);
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
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
