import { Component, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Router } from "@angular/router";
import { Endpoints } from './app-endpoints';
import { Patient } from './entities/Patient';
import { AccountType } from './entities/AccountType';
import { max } from 'lodash';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Capacitor } from "@capacitor/core";

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
  public static getScreenWidth: any;
  public static getScreenHeight: any;
  public step: number;
  

  constructor( private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private router: Router, private endpoints: Endpoints)
  {
    // Check if active user exists.
    if (JSON.parse(localStorage.getItem('user')) === undefined || JSON.parse(localStorage.getItem('user')) === null)
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
            //this.endpoints.sendCovidNotification(this.activeUser, this.patient.interactions[0])
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

  }
  ngOnInit() 
  {
    AppComponent.getScreenWidth = window.innerWidth;
    AppComponent.getScreenHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() 
  {
    AppComponent.getScreenWidth = window.innerWidth;
    AppComponent.getScreenHeight = window.innerHeight;
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
  while (true) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    //console.log(this.patient)
    //this.checkForContacts(this.patient.interactions[0]);
    if (this.activeUser.account_type == "PATIENT") {
        this.geolocation();
        await this.delay(60000); //check every 5 minutes
    }
    await this.delay(1000);
  }
   }

  sideMenu()
  {
     this.navigate =
     [
        { title: 'Home', url:'/home-page', icon: 'home-outline' /* find a list of all possible icons at https://ionic.io/ionicons */ },
        { title: 'Update my Status', url:'/status-update', icon: 'newspaper-outline' },
        { title: 'back to welcome', url:'/welcome-page', icon: 'planet-outline' }, //these three are only for demonstration purposes
        { title:'Appointment',url:'/appointment',icon:'calendar-outline' },
        { title: 'to sign-in', url:'/signin-page', icon: 'person-outline' },
        { title: 'to sign-up', url:'/signup-page', icon: 'hand-right-outline' },
        { title: 'Manage Profiles', url:'/manage-profiles', icon: 'people-outline' },
        { title: 'Monitor Patients', url:'/monitoring-status',icon: 'people-outline' },
        { title: 'Assignment', url:'/assignment',icon: 'people-outline' },
        { title:'Contact',url:'/contact', icon:'mail-outline' },
     ];
    }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
      
  }

  geolocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.removeOldInteractions();
      //const distance = this.calculateDistance(this.lat, position.coords.latitude, this.lon, position.coords.longitude);
      var roundlat = position.coords.latitude.toFixed(4);
      var roundlon = position.coords.longitude.toFixed(4);
      var posi = roundlat + roundlon;
      var sha1 = require('sha-1');
      var newhash = sha1(posi);
      if (!this.hash){
        this.hash = newhash;
      }
      //console.log(newhash);
      //console.log(this.lat + ", " + this.lon);

      if (this.hash != newhash) //same square ~10m, approaches 0 the closer to the poles you are
      {
        if (this.record && this.step >= 15) { //started moving again after being stopped for 15 loops
          this.end = new Date().getTime();

          let flag = this.patient.flagged;
          this.endpoints.createInteraction(this.start, this.end, this.location, this.patient.id, flag).subscribe((data) => {
            let id = data.id;
            this.endpoints.addInteractionToPatient(this.patient.id, id);
            this.removeOldInteractions();
            this.checkForContacts(data);
          });
          this.record = false;
        }
        this.step = 0;
        this.moving = true;
        this.hash = newhash
      }
      if (this.hash == newhash) //same square
      {
        if (this.moving) {
          //console.log("stopped")
          //console.log("location being recorded.")
          this.start = new Date().getTime();
          this.location = this.hash;
          this.record = true;
        }
        this.step++;
        this.moving = false;
      }
        console.log(this.hash);

      },function(){
        console.log("geolocation turned off.");
      	if(!LocationPermission.checkGPSPermission()){
      		console.log(LocationPermission.requestGPSPermission());
      		if(LocationPermission.askToTurnOnGPS()){
      			console.log("GPS turned on");
      		}
      	}else{
    	}
      },{timeout:10000})
    }

  removeOldInteractions() {
    this.patient.interactions.forEach(element => {
      //console.log(element)
      const interactionTime = Date.parse(element.start)
      const today = new Date().getTime();
      const diff = today-interactionTime;
      if (diff > 2628000000) { // 1 month
        //console.log(diff)
        this.endpoints.removeInteractionFromPatientHistory(this.patient.id, element.id); //doesn't work properly
      } 
    });
  }

  checkForContacts(interaction: any) { // check for possible contacts from interaction
    // refresh patient
    this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
      data => {
        this.patient = data[0];
        var start1 = Date.parse(interaction.start);
        var end1 = Date.parse(interaction.end);
        this.endpoints.getInteractionsByLocation(interaction.location).subscribe((data) => {
          //console.log(data);
          data.forEach(element => {
            var start2 = Date.parse(element.start);
            var end2 = Date.parse(element.end)
            if (!interaction.flagged && element.patient.id != this.patient.id && element.flagged) { //non flagged patient looking for possible contacts from other patients
              //console.log(Math.min(end1, end2) - Math.max(start1, start2))
              if (Math.min(end1, end2) - Math.max(start1, start2) > 900000) { //stayed in contact for 15m
                console.log("sending email")
                this.endpoints.sendCovidNotification(this.activeUser, interaction);
              }
            }

            else if (interaction.flagged && element.patient.id != this.patient.id && !element.flagged) {//flagged patient changed location, check for possible contacts with non flagged patients
              if (Math.min(end1, end2) - Math.max(start1, start2) > 900000) { //stayed in contact for 15m
                console.log("sending email");
                this.endpoints.getUserById(element.patient.is_user).subscribe((data) => {
                  this.endpoints.sendCovidNotification(data, element);
                })
              }
            }
          })
        })
      });
  }


}
const LocationPermission = {
    // Check if application having GPS access permission
    checkGPSPermission: async (): Promise<boolean> => {
        return await new Promise((resolve, reject) => {
            if (Capacitor.isNative) {
                AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
                    result => {
                        if (result.hasPermission) {
                            // If having permission show 'Turn On GPS' dialogue
                            resolve(true);
                        } else {
                            // If not having permission ask for permission
                            resolve(false);
                        }
                    },
                    err => { alert(err); }
                );
            }
            else { resolve(true);  }
        })
    },

    requestGPSPermission: async (): Promise<string> => {
        return await new Promise((resolve, reject) => {
            LocationAccuracy.canRequest().then((canRequest: boolean) => {
                if (canRequest) {
                    resolve('CAN_REQUEST');
                } else {
                    // Show 'GPS Permission Request' dialogue
                    AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
                        .then(
                            (result) => {
                                if (result.hasPermission) {
                                    // call method to turn on GPS
                                    resolve('GOT_PERMISSION');
                                } else {
                                    resolve('DENIED_PERMISSION');
                                }
                            },
                            error => {
                                // Show alert if user click on 'No Thanks'
                                alert('requestPermission Error requesting location permissions ' + error);
                            }
                        );
                }
            });
        })
    },

    askToTurnOnGPS: async (): Promise<boolean> => {
        return await new Promise((resolve, reject) => {
            LocationAccuracy.canRequest().then((canRequest: boolean) => {
                if (canRequest) {
                    // the accuracy option will be ignored by iOS
                    LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                        () => {
                            resolve(true);
                        },
                        error => { resolve(false); } );
                }
                else { resolve(false);  }
            });
        })
    }
}
export default LocationPermission;