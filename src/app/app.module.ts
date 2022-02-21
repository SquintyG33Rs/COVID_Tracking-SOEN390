import { SigninPageModule } from './pages/signin-page/signin-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
  AppComponent
  ],
  entryComponents: [
  ],
  imports: [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  SigninPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
  	provide: RouteReuseStrategy,
  	useClass: IonicRouteStrategy
  }],
  bootstrap: [
  AppComponent
  ],
})
export class AppModule {}
