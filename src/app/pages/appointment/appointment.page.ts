import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from "../../entities/User";
import { DatabaseService } from "../../database-services/database.service";
import { AccountType } from 'src/app/entities/AccountType';
import { Router } from "@angular/router";
import { Appointment } from 'src/app/entities/Appointment';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.page.html',
    styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit{
    private activeUser: User;
    public patients=[];
    public appointments=[];
    appointmentUsername:string;
    appointmentUser:User;
    date:string;
    private router: Router;
    successfullAppointment: boolean = false;


    constructor(private databaseService: DatabaseService, router: Router){
        this.databaseService = databaseService;
        this.activeUser = this.databaseService.activeUser;
        this.router = router;
        
        //Getting all patients. It will be modified to get active user's patients later
        for(let i=0; i<this.databaseService.users.length;i++){
            //console.log(this.databaseService.users[i].accountType);
            if(this.databaseService.users[i].accountType==AccountType.PATIENT){
                //var x= this.databaseService.users[i].firstName+" "+this.databaseService.users[i].lastName
                this.patients.push(this.databaseService.users[i]);
                //console.log("yes");
            }
        }
        //Getting all appointments. Must be modified to get only the upcoming appointments and not all
        for(let i=0;i<this.databaseService.appointments.length;i++){
            if(this.databaseService.appointments[i].doctor==this.activeUser){
                this.appointments.push(this.databaseService.appointments[i]);
            }
        }


    }
    CreateAppointment(){
        console.log(this.date);
        console.log(this.appointmentUsername);

        //finding the patient with the username
        for(let i=0; i<this.databaseService.users.length;i++){
            if(this.databaseService.users[i].username==this.appointmentUsername){
                this.appointmentUser=this.databaseService.users[i];
            }
        }
        const newAppointment:Appointment = new Appointment(this.activeUser,this.appointmentUser,this.date)
        this.databaseService.appointments.push(newAppointment);
        this.successfullAppointment=true;
        setTimeout(() => { this.router.navigate(['home-page']).then(() => console.log("Route Back To Home Page.")); }, 3000);
    }
    ngOnInit() 
    {
        // If it is a doctor, the block for doctors will be shown.  
        if(this.activeUser.accountType!="MEDICALDOCTOR"){
            var content2=document.getElementById("A_doctor");
            content2.style.display="none";
        }

        //If not, the other block will be shown. I think this is bad practice and should be modfied later
        else{
            var content1=document.getElementById("Not_a_doctor");
            content1.style.display="none";
        }

        for(let i=0;i<this.patients.length;i++){
            console.log(this.patients[i]);
        }
    }
}



