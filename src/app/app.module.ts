import { SigninPageModule } from './pages/signin-page/signin-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Endpoints } from './app-endpoints';
import { Sockets } from './app-socket';

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
  SigninPageModule,
  HttpClientModule
  ],
  providers: [
    Endpoints,
    StatusBar,
    SplashScreen,
    Sockets,
    {
  	provide: RouteReuseStrategy,
  	useClass: IonicRouteStrategy
  }],
  bootstrap: [
  AppComponent
  ],
})
export class AppModule {}
