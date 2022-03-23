import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Endpoints} from "../../app-endpoints";
import {Patient} from "../../entities/Patient";
import {Doctor} from "../../entities/Doctor";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {
  private router: Router;
  private endpoints: Endpoints;


  private activeUser;
  private doctors: any = [];
  private patients: any = [];
  doctorAssigned: Doctor;
  patientAssigned: Patient;
  sortBy = require('sortby');

  constructor(endpoints: Endpoints, router: Router) {
    this.endpoints = endpoints;
    this.router = router;
  }


  ngOnInit() {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.activeUser);

    //get doctors
    this.endpoints.getDoctors().subscribe(
      data => {
        // sort doctors by their number of patients in ascending order
      this.doctors = data.sort(this.sortBy({patients: 1}));
      console.log("All the doctors")
      console.log(this.doctors);

      //get patients
      this.endpoints.getPatients().subscribe(
          data => {
          this.patients = data;
          console.log("All the patients");
          console.log(this.patients);


        },err => console.log(err)

      )


      },err => console.log(err)
    )

  }

  async ngOnAssign(){

  }

}
