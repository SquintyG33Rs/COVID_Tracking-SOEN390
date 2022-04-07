import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { Endpoints } from '../../app-endpoints';
import { TouchSequence } from 'selenium-webdriver';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.scss'],
})

export class ContactPage implements OnInit{
    public activeUser: any;
    private router:Router;
    private activePatient: any;
    private activeDoctor: any;
    private ready = false;


    constructor( router:Router, private endpoints: Endpoints){
        this.router=router;

    }

    sendMessage(message){ //patient or doctor id
        console.log(message)
        this.endpoints.createMessage(this.activeUser.id, "test", message).subscribe(data => {
            if (this.activePatient) {
                this.endpoints.sendMessageToDoctor(this.activePatient.current_doctor, data.id).subscribe(data => {
                    console.log(data)
                })
            }
            
        })
    }

    ngOnInit() {
      this.activeUser = JSON.parse(localStorage.getItem('user'));
      console.log(this.activeUser);

      if(this.activeUser.account_type=='PATIENT'){
        this.endpoints.getPatientByUserId(this.activeUser.id).subscribe((data) => {
            this.activePatient = data[0]
            this.endpoints.getUserById(this.activePatient.current_doctor.is_user).subscribe(data => {
                this.activePatient.current_doctor.is_user = data
                this.ready = true
            })
        })
      }

      else if(this.activeUser.account_type=='MEDICALDOCTOR'){
        this.endpoints.getDoctorByUserId(this.activeUser.userid).subscribe((data) => {
            this.activeDoctor = data
        })
      }
    }
}
