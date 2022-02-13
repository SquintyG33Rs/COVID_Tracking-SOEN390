import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { StatusUpdatePage } from '../pages/status-update/status-update';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {WelcomePage} from "../pages/welcome/welcome";
import {WelcomePageModule} from "../pages/welcome/welcome.module";
import {SignupPageModule} from "../pages/signup/signup.module";
import {SignupPage} from "../pages/signup/signup";
import {SigninPageModule} from "../pages/signin/signin.module";
import {SigninPage} from "../pages/signin/signin";
import {DatabaseService} from "./database-services/database.service";
import {HomePageModule} from "../pages/home/home.module";



@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    StatusUpdatePage
  ],
  imports: [
    BrowserModule,
    WelcomePageModule,
    SignupPageModule,
    SigninPageModule,
    HomePageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    SignupPage,
    SigninPage,
    HomePage,
    ListPage,
    LoginPage,
    StatusUpdatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatabaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
