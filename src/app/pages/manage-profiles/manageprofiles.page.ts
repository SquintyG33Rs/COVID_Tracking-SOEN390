import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BreadcrumbCollapsedClickEventDetail, IonicModule } from '@ionic/angular';
import { User } from "../../entities/User";
import { DatabaseService } from "../../database-services/database.service";
import { AccountType } from 'src/app/entities/AccountType';
import { Router } from "@angular/router";

@Component({
    selector: 'app-manage-profiles',
    templateUrl: './manageprofiles.page.html',
    styleUrls: ['./manageprofiles.page.scss'],
})
export class ManageProfilesPage implements OnInit{
    private activeUser: User;
    public patients=[];
    public appointments=[];
    appointmentUsername:string;
    appointmentUser:User;
    date:string;
    private router: Router;
    successfullAppointment: boolean = false;
    private clicked: boolean = false;
    private users: User[];
    private displayedUsers: User[];
    private items: HTMLIonListElement[] = Array.from(document.querySelector('ion-list').children) as HTMLIonListElement[];
    private editedUser: User = new User('', '', '', '', AccountType.PATIENT, '', '', '');
    private editedUserIndex: number = 0;


    constructor(private databaseService: DatabaseService, router: Router){
        this.databaseService = databaseService;
        this.activeUser = this.databaseService.activeUser;
        this.users = this.databaseService.users;
        this.displayedUsers = this.databaseService.users;        
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
    
    ngOnInit() 
    {
       
    }

    search(query:string)
    {
        this.displayedUsers = this.users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()))
    }

    buttonClick(user: User, i:number)
    {  
        this.editedUser = user;
        this.editedUserIndex = i;
        this.clicked = true;
    }

    submit()
    {
        this.databaseService.users[this.editedUserIndex] = this.editedUser;
        
        this.router.navigate(['home-page']);
    }
}



