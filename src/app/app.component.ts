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
  public lat: number;
  public lon: number;
  public moving: boolean;
  public record: boolean;
  public start: any;
  public end: any;
  public location: any;
  public hash: any;
  public activeUser: any;
  public patient: any;
  constructor( private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private router: Router, private endpoints: Endpoints)
  {
    // Check if active user exists.
    if (localStorage.getItem('user') === undefined || localStorage.getItem('user') === null)
    {
      console.log("Could not find active user.")
    }
    else
    {
      //console.log("e")
      // Read Active-User from Disk:
      this.activeUser = JSON.parse(localStorage.getItem('user'));
      console.log(this.activeUser);
      
      if (this.activeUser.account_type == "PATIENT") {
        this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
          data => {
            this.patient = data[0];
            this.endpoints.sendCovidNotification(this.activeUser, this.patient.interactions[0])
            this.geolocationLoop();
          });
      
      }
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
      this.platform.ready().then(async () =>
      {
       this.statusBar.styleDefault();
       this.splashScreen.hide();
       
      });

   }

  async geolocationLoop() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude; //chaning only after detected movement in case of slow movement
      this.lon = position.coords.longitude;
  },function(){
    console.log("User did not allow geolocation.");
  },{timeout:10000});
    while (true) {
      this.activeUser = JSON.parse(localStorage.getItem('user'));
      //console.log(this.patient)
      this.checkForContacts(this.patient.interactions[0]);
      if (this.activeUser.account_type == "PATIENT") {
          this.geolocation();
          await this.delay(300000); //check every 5 minutes
      }
      await this.delay(10000);
    }
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

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
      
  }

    geolocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.removeOldInteractions();
        const distance = this.calculateDistance(this.lat, position.coords.latitude, this.lon, position.coords.longitude);
        if (distance > 50) //50m threshold
        {
          this.lat = position.coords.latitude; //chaning only after detected movement in case of slow movement
          this.lon = position.coords.longitude;
          //console.log("moving")
          if (this.record) { //started moving again after being stopped
            this.end = new Date().getTime();
            //console.log("moving again, recording over.")
            //console.log("Start: " + this.start + ", loc: {lat: " + this.location.lat + ", lon: " + this.location.lon + " }, End: " + this.end)

/*hashing function*/
            var posi =  String(this.lat).concat(String(this.lon));
            var sha1 = require('sha-1');
            this.hash = sha1(posi);
            /*
            example:
              var posi =  String(40.774929).concat(String(-114.419416));
              this.hash = sha1(posi); //bdf6c2db6183883ce84012e53b7ab75113062e0a
            */
            console.log(this.hash);
/*change database post to use this value instead*/

            let flag = this.patient.flagged;
            this.endpoints.createInteraction(this.start, this.end, this.location, this.patient.id, flag).subscribe((data) => {
              let id = data.id;
              this.endpoints.addInteractionToPatient(this.patient.id, id);
              this.removeOldInteractions();
              this.checkForContacts(data);
            });
            this.record = false;
          }
          this.moving = true;
        }
        if (distance < 10) //10m threshold for gps inaccuracies
        {
          if (this.moving) {
            //console.log("stopped")
            //console.log("location being recorded.")
            this.start = new Date().getTime();
            this.location = {lat: this.lat, lon: this.lon}
            this.record = true;
          }
          this.moving = false;
        }
        console.log(this.lat + ", " + this.lon);

      },function(){
        console.log("User did not allow geolocation.");
      },{timeout:10000})
    }

    calculateDistance(lat1: number, lat2: number, lon1: number, lon2: number): number { //haversine formula to calculate distances on a sphere from spherical coordinate points
      const radius = 6371e3; 
      const phi1 = lat1 * Math.PI/180; //in rad
      const phi2 = lat2 * Math.PI/180;
      const deltaphi = (lat2-lat1) * Math.PI/180;
      const deltalambda = (lon2-lon1) * Math.PI/180;
      const haversine = Math.sin(deltaphi/2) * Math.sin(deltaphi/2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltalambda/2) * Math.sin(deltalambda/2);
      const archaversine = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1-haversine));
      const distance = radius * archaversine; // in m
      return distance;
    }

    removeOldInteractions() {
      this.patient.interactions.forEach(element => {
        //console.log(element)
        const interactionTime = Date.parse(element.start)
        const today = new Date().getTime();
        if (today - interactionTime > 2.628e6) { // 1 month
          this.endpoints.removeInteractionFromPatientHistory(this.patient.id, element.id);
        } 
      });
    }

    checkForContacts(interaction: any) { // check for specific contact
      // refresh patient
      this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
        data => {
          this.patient = data[0];
          
          this.endpoints.getInteractions().subscribe((data) => {
            //console.log(data)
            data.forEach(element => {
              if (element.flagged && element.patient.id != this.patient.id && !interaction.flagged) { //ignore self, logic for non flagged patient travelling
                let distance = this.calculateDistance(interaction.location.lat, element.location.lat, interaction.location.lon, element.location.lon);
                if (distance < 50) { //50m threshold, should be same or higher than moving threshold
                  //Possible contact, send notification to self.
                  let selfEmail = this.patient.is_user.email; //placeholder, can be app notifications too.
                  //flag patient if patient shows symptoms, which should be in status-updates.
                }
              }

              if (!element.flagged && element.patient.id != this.patient.id && interaction.flagged) { //ignore self, logic for a flagged patient travelling
                let distance = this.calculateDistance(interaction.location.lat, element.location.lat, interaction.location.lon, element.location.lon);
                if (distance < 50) { //50m threshold, should be same or higher than moving threshold
                  //Possible contact, send notification to user.
                  this.endpoints.getPatientByPatientId(element.patient.id).subscribe((data) => {
                    let userEmail = data[0].is_user.email; //exposes another user's email, not the best.
                  })
                  //flag patient if patient shows symptoms, which should be in status-updates.
                }
              }

            })
          })
        });
    }

    checkForContactsAll() { // broad check for contacts, probably don't use this.
      // refresh patient
      this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
        data => {
          this.patient = data[0];
          
          this.endpoints.getInteractions().subscribe((data) => {
            console.log(data)
            data.forEach(element => {
              if (element.flagged && element.patient.id != this.patient.id) { //ignore self
                data.forEach(interaction => {
                  if (interaction.id != element.id && interaction.patient.id != this.patient.id) {//ignore self and own interactions, element is flagged interaction
                    let distance = this.calculateDistance(interaction.location.lat, element.location.lat, interaction.location.lon, element.location.lon);
                    if (distance < 50) { //50m threshold, should be same or higher than moving threshold
                      //Possible contact, send notification.
                    }
                  }
                })
              }
            })
          })
        });
    }
}
