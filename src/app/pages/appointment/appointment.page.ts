import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AlertController, IonicModule} from '@ionic/angular';
import { User } from "../../entities/User";
import { DatabaseService } from "../../database-services/database.service";
import { AccountType } from 'src/app/entities/AccountType';
import { Router } from "@angular/router";
import { Appointment } from 'src/app/entities/Appointment';
import {Endpoints} from "../../app-endpoints";
import {Doctor} from "../../entities/Doctor";
import {Patient} from "../../entities/Patient";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit{
  private endpoints: Endpoints;
  private router: Router;
  private appointments: any = [];
  private alertController: AlertController;

  private doctor: any;
  private patient: any;
  date: Date;
  private activeUser: any;
  private patients: any = [];



  constructor(endpoints: Endpoints, router: Router, alertController: AlertController) {
    this.endpoints = endpoints;
    this.router = router;
    this.alertController = alertController;
  }

  //alert
  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Appointment Creation',
      cssClass:'my-custom-class',
      subHeader: 'Success',
      message: "Appointment with " + this.patient.is_user.first_name + " " + this.patient.is_user.last_name + " on " + formatDate(this.date, 'MMMM dd, YYY HH:mm (O)', 'en-CA','-4' ) + " successfully created.",
      buttons: ['OK']
    });

    await alert.present();
  }

  async showFailedAlert() {
    const alert = await this.alertController.create({
      header: 'Appointment Creation',
      cssClass:'my-custom-class',
      subHeader: 'Fail',
      message: "Error in appointment creation.",
      buttons: ['OK']
    });

    await alert.present();
  }



  ngOnAppointment(date, patientid){
    console.log(patientid)
    const unixTime = Date.parse(date)
    console.log(unixTime)
    if (date != undefined && patientid != undefined)
    {
      this.endpoints.createAppointment(this.doctor.id, patientid, unixTime).subscribe((app) => {
        console.log(app);
        this.patient = app.patient;
        console.log(this.patient);
        //get the doctor user details
        this.endpoints.getUserById(this.patient.is_user).subscribe(
          pat => {
            //reassign doctor user details instead of just their user ID
            this.patient.is_user = pat;
            this.showSuccessAlert();
            setTimeout (()=> window.location.assign('/appointment'),3000);
          }
        )
      })

    }
    else {
      this.showFailedAlert();
    }

  }

  ngOnInit()
  {
    //get the authenticated user
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')));

    this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
      data => {
        //get the active doctor
        this.doctor = data[0];
        console.log("Active doctor")
        console.log(this.doctor);

        console.log("Active doctor's patients")
        console.log(this.doctor.patients);


        //for each patient of the active doctor
        for (let i = 0; i < this.doctor.patients.length; i++) {
          //get them by their patient ID
          this.endpoints.getPatientByPatientId(this.doctor.patients[i].id).subscribe((data) =>
          {
            console.log("Patient " + (i+1));
            console.log(data)
            //push them onto a patients array
            this.patients.push(data);
            //console.log(this.patients)
          });
        }
      });
    if (this.activeUser.account_type == "MEDICALDOCTOR") {
      this.endpoints.getAppointmentsByDoctorUserId(this.activeUser.id).subscribe((data) => {
        this.appointments = data;
        console.log(this.appointments);
      });
    }
    else if (this.activeUser.account_type == "PATIENT") {
      this.endpoints.getAppointmentsByPatientUserId(this.activeUser.id).subscribe((data) => {
        this.appointments = data;
        console.log(this.appointments);
      });
    }
  }

}



