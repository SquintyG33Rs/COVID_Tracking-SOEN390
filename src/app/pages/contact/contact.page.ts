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
    private messages = []


    constructor( router:Router, private endpoints: Endpoints){
        this.router=router;

    }

    ngOnInit() {

        this.activeUser = JSON.parse(localStorage.getItem('user'));
      
        this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
        res =>
        {
            this.messages = res[0].incoming_messages;
        },err => console.log(err))
    }
}
