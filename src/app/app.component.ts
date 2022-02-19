import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import {User} from "./entities/User";
import {Router} from "@angular/router";
import {DatabaseService} from "./database-services/database.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;

  constructor( private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private router: Router, private databaseService: DatabaseService) {
    // Read Active-User from Disk:
    let activeUser: User = JSON.parse(localStorage.getItem('activeUser'));
    console.log(activeUser);
    if(activeUser != null) {
      this.databaseService.activeUser = activeUser;
      this.router.navigateByUrl("/home-page");
    }

     this.sideMenu();
     this.initializeApp();
   }

   initializeApp() {
     this.platform.ready().then(() => {
       this.statusBar.styleDefault();
       this.splashScreen.hide();
     });
   }

   sideMenu() {
     this.navigate =
     [
        { title: 'Home', url:'/home-page', icon: 'home-outline' /* find a list of all possible icons at https://ionic.io/ionicons */ },
        { title: 'Update my Status', url:'/status-update', icon: 'newspaper-outline' },
        { title: 'back to welcome', url:'/welcome-page', icon: 'planet-outline' }, //these three are only for demonstration purposes
        { title: 'to sign-in', url:'/signin-page', icon: 'person-outline' },
        { title: 'to sign-up', url:'/signup-page', icon: 'hand-right-outline' }
     ];

   }
}
