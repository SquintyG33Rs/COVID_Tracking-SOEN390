import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Endpoints} from "../../app-endpoints";
import {Patient} from "../../entities/Patient";
import {Doctor} from "../../entities/Doctor";
import {AlertController, NavController} from "@ionic/angular";

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
  private doctorAssigned: any;
  private patientAssigned: any;
  private doctor: any;
  private patient: any;
  sortBy = require('sortby');
  private alertController: AlertController;
  private nav: NavController;



  constructor(endpoints: Endpoints, router: Router, alertController: AlertController, navCtrl: NavController) {
    this.endpoints = endpoints;
    this.router = router;
    this.alertController = alertController;
    this.nav = navCtrl;
  }
/*
  comparePatients(p1: Patient, p2: Patient){
    return p1 && p2 ? p1.username === p2.username : p1 === p2;
  }

  compareDoctors(d1: Doctor, d2: Doctor){
    return d1 && d2 ? d1.username === d2.username : d1 === d2;
  }*/
  //alert
  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Nice!',
      cssClass:'my-custom-class',
      subHeader: 'Doctor/Patient assigned!',
      message: "Patient "+ this.patient.is_user.first_name + " " + this.patient.is_user.last_name + " was assigned to Doctor " + this.doctor.is_user.first_name + " " + this.doctor.is_user.last_name,
      buttons: ['OK']
    });

    await alert.present();
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
    console.log(this.doctorAssigned);
    console.log(this.patientAssigned);

    //get doctor assigned from their ID
    this.endpoints.getDoctorByDoctorId(this.doctorAssigned).subscribe(
      data => {
        this.doctor = data;
        console.log("Doctor assigned");
        console.log(this.doctor);

        //get patient assigned from their ID
        this.endpoints.getPatientByPatientId(this.patientAssigned).subscribe(

          data => {
            this.patient = data;
            console.log("Patient assigned");
            console.log(this.patient);

            //assign the doctor to the patient
            this.endpoints.addDoctorToPatient(this.doctorAssigned, this.patientAssigned).subscribe(
              () => {

                //push patient in doctor's list of patients
                this.doctor.patients.push(this.patient);

                console.log(this.doctor.patients);

                //modify doctor's list of patients
                this.endpoints.addPatientToDoctor(this.doctorAssigned, this.doctor.patients).subscribe(
                  (data) =>{
                    console.log(JSON.stringify(data));
                    console.log("Patient "+ this.patient.is_user.first_name + " " + this.patient.is_user.last_name + " was assigned to Doctor " + this.doctor.is_user.first_name + " " + this.doctor.is_user.last_name)
                    //show the alert
                    this.showAlert();
                    //refresh the page
                    this.nav.navigateBack('/home-page').then(() => this.nav.navigateForward('/assignment'));


                  },err => console.log(err)
                )
              },err => console.log(err)
            )
          },err => console.log(err)

        )
      },err => console.log(err)

    )


  }

}
