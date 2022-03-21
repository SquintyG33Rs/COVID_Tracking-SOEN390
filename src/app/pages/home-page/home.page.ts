import { MyServiceEvent, RouteChangeDetection } from './../../scripts/RouteChangeListener';
import { Component, OnInit } from '@angular/core';
import { Endpoints } from "../../app-endpoints";
import { User } from "../../entities/User";
import { Router } from "@angular/router";
import { AccountType } from 'src/app/entities/AccountType';
import { Subscription } from 'rxjs';
import {QRCodeComponent} from "angular2-qrcode";



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
  currentRouteURL: String;
  urlDetector: RouteChangeDetection = new RouteChangeDetection(this.router);


  constructor(private endpoints: Endpoints, private router: Router)
  {
    this.endpoint = endpoints;

    this.serviceSubscription = this.urlDetector.onChange.subscribe({
      next: (event: MyServiceEvent) => {
        this.onChangeRouteDetection(event.message);
      }
  })
  }

  onChangeRouteDetection(message:string)
  {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')))
    if (message === '/home-page')
    {
      /*switch (this.activeUser.accountType)
      {
        case AccountType.ADMIN:
        break;
        case AccountType.MEDICALDOCTOR:
          console.log("Hello Doctor!");

            //Doctor code goes here

        break;
        case AccountType.HEALTHOFFICIAL:
        break;
        case AccountType.IMMIGRATIONOFFICER:
        break;
        case AccountType.PATIENT:
          console.log("Hello Patient!");

            //Patient code goes here etc.

        break;
      }
      */
    }
  }

  ngOnInit()
  {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log("log user:");
    console.log(this.activeUser.last_name);
  }

  logOut()
  {
    this.endpoint.activeUser = null;
    this.activeUser = null;
    localStorage.clear();
    this.router.navigateByUrl("/welcome-page");
    console.log("Active User:");
    console.log(this.activeUser);
  }









  // METHODS FOR PATIENT DASHBOARD:
  modifyPersonalInformation(username: string) {
    console.log("Modify Personal Information for: " + username);
    console.log("SHOULD BE LINKED TO PAGE - MANAGE PROFILE - AFTER IT STARTS WORKING...");
  }

  updateHealthStatus(username: string) {
    console.log("Update Health Status for: " + username);
    this.router.navigateByUrl("/status-update");
  }

  contactDoctor(username: string) {
    console.log("Contact Doctor for: " + username);
    console.log("SHOULD BE LINKED TO PAGE - CONTACTING A DOCTOR - AFTER IT STARTS WORKING...");
  }

  locationCheckin(username: string) {
    console.log("Location Checkin for: " + username);
    console.log("CAN BE USED FOR IMPLEMENTING CONTACT TRACING...");
  }

  generateQRCodeFromInfo() {
    let qrInfo = [{
      'firstName': this.activeUser.first_name,
      'lastName': this.activeUser.last_name,
      'covidStatus': "NEGATIVE",  // Must be filled from the Patient's Health Status.
    }]
    return JSON.stringify(qrInfo);
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
