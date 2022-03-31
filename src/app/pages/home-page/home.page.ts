import { MyServiceEvent, RouteChangeDetection } from '../../scripts/RouteChangeListener';
import { Component, OnInit } from '@angular/core';
import { Endpoints } from '../../app-endpoints';
import { User } from '../../entities/User';
import { Router } from '@angular/router';
import { AccountType } from 'src/app/entities/AccountType';
import { Subscription } from 'rxjs';
import {QRCodeComponent} from "angular2-qrcode";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit
{
  private endpoint;
  private serviceSubscription: Subscription;
  private activeUser;
  private activePatient;
  private activeDoctor;
  private patientUpdates: any = [];
  private recentUpdate: any;
  private currentDoctor: any;
  private flagged: boolean;
  updates: any = [];
  currentRouteURL: String;
  urlDetector: RouteChangeDetection = new RouteChangeDetection(this.router);
  sortBy = require('sortby');





  constructor(private endpoints: Endpoints, private router: Router)
  {
    this.endpoint = endpoints;

    this.serviceSubscription = this.urlDetector.onChange.subscribe({
      next: (event: MyServiceEvent) => {
        this.onChangeRouteDetection(event.message);
      }
  });
  }

  onChangeRouteDetection(message: string)
  {


  }

  ngOnInit()
  {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.activeUser);



    //if user is logged in
    if (this.activeUser !== null) {
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
            console.log(this.activeDoctor);





          },err => console.log(err)
        )
      }

      else
      {
        this.endpoints.getUpdates().subscribe(
          res => {
            //sort updates by
            this.updates = res.sort(this.sortBy({created_at: -1}));
            console.log("All the status updates");
            console.log(this.updates);

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
    window.location.assign('/welcome-page');
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
    window.location.assign("/status-update");
  }

  contactDoctor(username: string) {
    console.log("Contact Doctor for: " + username);
    console.log("SHOULD BE LINKED TO PAGE - CONTACTING A DOCTOR - AFTER IT STARTS WORKING...");
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
    //console.log(/*JSON.stringify*/(qrInfo[0]));
    return JSON.stringify(qrInfo[0]);
  }

  updateQRCode(QRCODE: QRCodeComponent) {
    QRCODE.value = this.generateQRCodeFromInfo();
    console.log("QR-Code is updated and generated.");
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
}
