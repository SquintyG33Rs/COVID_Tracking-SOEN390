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


    constructor( router:Router, private endpoints: Endpoints){
        this.router=router;

    }

  ngOnInit() {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    this.endpoints.getUserById(this.activeUser.id).subscribe(data =>{
      localStorage.setItem('user', JSON.stringify(data));
      this.activeUser = JSON.parse(localStorage.getItem('user'));

      if(this.activeUser.account_type=='PATIENT'){
        this.endpoints.getPatientByUserId(this.activeUser.id).subscribe((data) => {
            this.activePatient = data[0];
            this.endpoints.getUserById(this.activePatient.current_doctor.is_user).subscribe(data => {
                this.activePatient.current_doctor.is_user = data;
            })
        })
      }
    })
  }
}
