import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from "../../entities/User";
import { DatabaseService } from "../../database-services/database.service";
import { AccountType } from 'src/app/entities/AccountType';
import { Router } from "@angular/router";
import { Appointment } from 'src/app/entities/Appointment';
import {Endpoints} from "../../app-endpoints";
import {Doctor} from "../../entities/Doctor";
import {Patient} from "../../entities/Patient";

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.page.html',
    styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit{
    private endpoints: Endpoints;
    private router: Router;
    private appointment;

  private doctor: any;
  private patient: any;
  date: Date;
  private activeUser: any;
  private patients: any = [];



  constructor(endpoints: Endpoints, router: Router) {
    this.endpoints = endpoints;
    this.router = router;
  }
    ngOnAppointment(){

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
          console.log(this.doctor.is_user.first_name);

          console.log("Active doctor's patients")
          console.log(this.doctor.patients);


          this.endpoints.getPatientByUserId(this.patient.is_user).subscribe(
            data => {console.log(data);
          //reassign current patient rather than just it's ID
          this.patient.is_user = data[0];
          console.log(this.patient.is_user);
        })




        }
      )
    }
}



