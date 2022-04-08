import { MyServiceEvent, RouteChangeDetection } from '../../scripts/RouteChangeListener';
import { Component, OnInit } from '@angular/core';
import { Endpoints } from '../../app-endpoints';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from './../../app.component';
import { PatientsPage } from '../patients/patients.page';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit
{
  private endpoint;
  private activeUser;
  private activeUserProfilePictureURL :string = "";
  private activePatient;
  private activeDoctor;
  private patientUpdates: any = [];
  private recentUpdate: any;
  private currentDoctor: any;
  private flagged: boolean;
  private alertController;
  //private serviceSubscription: Subscription;
  //urlDetector: RouteChangeDetection = new RouteChangeDetection(this.router);

  updates: any = [];
  currentRouteURL: String;

  sortBy = require('sortby');
  doctorIcons: { name: string; img: string; }[];
  patientIcons: { name: string; img: string; }[];
  adminIcons: { name: string; img: string; }[];

  constructor(private endpoints: Endpoints, private router: Router, private  AlertController : AlertController)
  {
    this.endpoint = endpoints;
    this.alertController = AlertController;
  }

  /*onChangeRouteDetection(message: string)
  {

    var desiredHeight = (AppComponent.getScreenHeight*0.212085).toString();
    desiredHeight = desiredHeight+"px";
    console.log(desiredHeight);
    var colDivsArray = Array.from(document.getElementsByClassName("col_div") as HTMLCollectionOf<HTMLElement>);
    for(var i=0; i<colDivsArray.length; i++)
    {
      colDivsArray[i].style.height = desiredHeight;
    }

  }*/

  ngOnInit()
  {

    this.doctorIcons =
    [
      {
        name: "Patients",
        img:"/assets/icon/patients-icon.png"
      },
      {
        name: "Appointments",
        img:"/assets/icon/appointment-icon.png"
      },
      {
        name: "Messages",
        img:"/assets/icon/messages-icon.png"
      },
      {
        name: "Statistics",
        img:"/assets/icon/statistics-icon.png"
      },
      {
        name: "Calendar",
        img:"/assets/icon/calendar-icon.png"
      },
      {
        name: "Profile Settings",
        img:"/assets/icon/settings-icon.png"
      }
    ]

    this.patientIcons =
    [
      {
        name: "Contact Doctor",
        img:"/assets/icon/contact-icon.png"
      },
      {
        name: "Update Status",
        img:"/assets/icon/update-status-icon.png"
      },
      {
        name: "Messages",
        img:"/assets/icon/messages-icon.png"
      },
      {
        name: "Appointments",
        img:"/assets/icon/calendar-icon.png"
      },
      {
        name: "Profile Settings",
        img:"/assets/icon/settings-icon.png"
      },
      {
        name: "QR Code Generation",
        img:"/assets/icon/qrcode-icon.png"
      }
    ]

    this.adminIcons =
    [
      {
        name: "Doctor/Patient Assignment",
        img:"/assets/icon/assignment-icon.png"
      },
      {
        name: "Manage User Profiles",
        img:"/assets/icon/manage-users-icon.png"
      },
      {
        name: "Calendar",
        img:"/assets/icon/calendar-icon.png"
      },
      {
        name: "Profile Settings",
        img:"/assets/icon/settings-icon.png"
      },
      {
        name: "QR Code Generation",
        img:"/assets/icon/qrcode-icon.png"
      }
    ]

    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log("from HOME PAGE");
    console.log(this.activeUser);



    //if user is logged in
    if (this.activeUser !== null) {

      //try to get and set profile picture
      this.getAndSetProfilePictureURL();

      //if user is a patient
      if (this.activeUser.account_type === 'PATIENT')
      {
        //get patient info by their ID
        this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
          data => {
            this.activePatient = data[0];
            console.log("Active Patient")
            console.log( this.activePatient);

            //get patient status history
            this.patientUpdates = this.activePatient.status_history.sort(this.sortBy({created_at: -1}));
            //get recent patient status
            this.recentUpdate= this.activePatient.status;
            //get flagged
            this.flagged = this.activePatient.flagged;


            console.log("Active Patient Status history");
            console.log(this.activePatient.status_history);

            if(this.activePatient.current_doctor != null){
              console.log(this.activePatient.current_doctor.is_user);
              //get current doctor from their ID. activePatient.current_doctor.is_user was just returning the ID
              this.endpoints.getDoctorByUserId(this.activePatient.current_doctor.is_user).subscribe(
                data => {

                  console.log(data);
                  //reassign current doctor rather than just it's ID
                  this.currentDoctor = this.activePatient.current_doctor = data[0];
                  console.log(this.currentDoctor);
                })

            }
          },err => console.log(err)
        )
      }

      if (this.activeUser.account_type === 'MEDICALDOCTOR') {
        this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
          data => {
            this.activeDoctor = data[0];
          },err => console.log(err)
        )
      }

      else
      {
        this.endpoints.getUpdates().subscribe(
          res => {
            //sort updates by
            this.updates = res.sort(this.sortBy({created_at: -1}));
            //console.log("All the status updates");
            //console.log(this.updates);

          },
          err => console.log(err)
        );
      }
    }


  }

  logOut()
  {
    this.endpoint.activeUser = null;
    this.activeUser = null;
    localStorage.clear();
    this.router.navigateByUrl('/welcome-page');
    console.log('Logged out!');
    console.log(this.activeUser);
  }

  // METHODS FOR PATIENT DASHBOARD:
  modifyPersonalInformation(username: string) {
    console.log("Modify Personal Information for: " + username);
    console.log("SHOULD BE LINKED TO PAGE - MANAGE PROFILE - AFTER IT STARTS WORKING...");
  }

  updateHealthStatus(username: string) {
    console.log("Update Health Status for: " + username);
    //window.location.assign("/status-update");
    this.router.navigateByUrl('/status-update')
  }

  contactDoctor(username: string) {
    console.log("Contact Doctor for: " + username);
    //window.location.assign("/contact");
    this.router.navigateByUrl('/contact')
  }

  private hash: any;
  locationCheckin(username: string) {
    console.log("Location Checkin for: " + username);
    console.log("CAN BE USED FOR IMPLEMENTING CONTACT TRACING...");
    //hashing function button testint
            var sha1 = require('sha-1');
            this.hash = sha1('hello'); // aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
            console.log(this.hash);
  }

  generateQRCodeFromInfo() {
    let qrInfo = [{
      'firstName': this.activeUser.first_name,
      'lastName': this.activeUser.last_name,
      'covidStatus': "NEGATIVE",  // Must be filled from the Patient's Health Status.
    }]
    //console.log(JSON.stringify(qrInfo[0]));
    return JSON.stringify(qrInfo[0]);
  }

  updateQRCode() {
    var alt = '<img src="/assets/images/Dummy_QRcode.png" alt="QR">'; //dummy value for testing
      //this is the way the docs show it so i pushed this to repo but it doesn't work
    var qrValue = '<div> <qr-code [value]="generateQRCodeFromInfo()"[size]="450" #QRCODE> </qr-code> </div>';
    console.log("QR-Code is updated and generated.");
    console.log(alt);
    return alt;//alt for testing
  }

  async showQrCodeAlert() {
    const alert = await this.alertController.create({
      header: 'QR-Code',
      message: this.updateQRCode(),
      buttons: ['OK'],
    });

    await alert.present();
  }



  getDoctorName() {
    return "Doctor Full-Name";
  }

  getDoctorPhone() {
    return "Doctor Phone Number";
  }

  getDoctorEmail() {
    return "Doctor Email";
  }

  getAndSetProfilePictureURL()
  {
    // Check to see if there is any picture else set default picture
    if (this.activeUser.profile_picture != null)
    {
      this.activeUserProfilePictureURL = "https://api.team23soen390.xyz"+this.activeUser.profile_picture.url;
      document.getElementById("user_picture").style.backgroundImage = 'url("' + this.activeUserProfilePictureURL + '")';
    }
    else
    {
      document.getElementById("user_picture").style.backgroundImage = 'url("' + '/assets/images/default-profile-pic.jpg' + '")';
    }
  }

  goToPage(iconName :string)
  {
    switch(iconName)
    {
      case 'Appointments':
      {
        this.router.navigateByUrl('appointment');
        break;
      }

      case 'Contact Doctor':
      {
        this.contactDoctor(this.activeUser.username);
        break;
      }

      case 'Doctor/Patient Assignment':
      {
        this.router.navigateByUrl('assignment');
        break;
      }

      case 'Profile Settings':
      {
        this.router.navigateByUrl('settings');
        break;
      }

      case 'Manage User Profiles':
      {
        this.router.navigateByUrl('manage-profiles');
        break;
      }

      case 'Messages':
      {
        console.log('Messages');
        this.router.navigateByUrl('messages');
        break;
      }

      case 'Patients':
      {
        this.router.navigateByUrl('patients');
        break;
      }

      case 'QR Code Generation':
      {
        console.log('QR Code');
        this.showQrCodeAlert();
        break;
      }

      case 'Statistics':
      {
        console.log('Statistics');
        break;
      }

      case 'Update Status':
      {
        this.router.navigateByUrl('status-update');
        break;
      }

      default: break;
   }
  }

  async infoAlert()
  {
    var text = 'TEMP';

    if(this.flagged)
    {
      text = 'You have been identified to have contracted COVID, if you have a negative test contact your doctor to update your status.' ;
    }
    else
    {
      text = 'Status : Healthy';
    }
    
    const alert = await this.alertController.create({
      header: 'Info',
      message: text,
      buttons: ['OK'],
    });

    await alert.present();
  }
}






