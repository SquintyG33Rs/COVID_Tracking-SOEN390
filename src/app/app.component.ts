import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { User } from "./entities/User";
import { Router } from "@angular/router";
import { DatabaseService } from "./database-services/database.service";
import { HttpClient} from "@angular/common/http"
import { Endpoints } from './app-endpoints';
import { Patient } from './entities/Patient';
import { AccountType } from './entities/AccountType';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent
{
  navigate: any;
  public test = [];
  constructor( private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private router: Router, private endpoints: Endpoints)
  {
    // Check if active user exists.
    if (localStorage.getItem('user') === 'undefined')
    {
      console.log("Could not find active user.")
    }
    else
    {
      // Read Active-User from Disk:
      let activeUser = JSON.parse(localStorage.getItem('user'));
      console.log(activeUser);
/* refresh to home page
      if(activeUser != null)
      {
        //this.databaseService.activeUser = activeUser;
        this.router.navigateByUrl("/home-page");
      }

 */
    }
    this.sideMenu();
    this.initializeApp();

    //this.endpoints.getAppointmentByPatientUserId(1).subscribe((data) => {
    //  this.test = data[0]['doctor'];
    //  console.log(this.test)
    //})
    //console.log(this.test)

    //let temp = new User("Patient4", "123456", "Patient", "4", AccountType.PATIENT, "12345678", "abc@abc.com", "")
    //this.endpoints.createAccount(temp).subscribe((data) => {
    //  console.log(data)
    //})
    /*
    this.endpoints.login("Patient4", "123456").subscribe((data) => {
      console.log(data);
      this.endpoints.addDoctorToPatient(2, 3).subscribe((data) => {
        console.log(data);})
    })
    var m = new Date();
    var dateString = m.getTime()
    console.log(dateString)
    this.endpoints.createAppointment(2,3,dateString).subscribe((data) => {
      console.log(data);
    })*/
  }

   initializeApp()
   {
      this.platform.ready().then(() =>
      {
       this.statusBar.styleDefault();
       this.splashScreen.hide();
      });
   }

   sideMenu()
   {
     this.navigate =
     [
        { title: 'Home', url:'/home-page', icon: 'home-outline' /* find a list of all possible icons at https://ionic.io/ionicons */ },
        { title: 'Update my Status', url:'/status-update', icon: 'newspaper-outline' },
        { title: 'back to welcome', url:'/welcome-page', icon: 'planet-outline' }, //these three are only for demonstration purposes
        {title:'Appointment',url:'/appointment',icon:'calendar-outline'},
        { title: 'to sign-in', url:'/signin-page', icon: 'person-outline' },
        { title: 'to sign-up', url:'/signup-page', icon: 'hand-right-outline' },
        { title: 'Manage Profiles', url:'/manage-profiles', icon: 'people-outline' },
        { title: 'Monitor Patients', url:'/monitoring-status',icon: 'people-outline'},
        { title: 'Assignment', url:'/assignment',icon: 'people-outline'},
        {title:'Contact',url:'/contact', icon:'mail-outline'},
     ];
    }
}
