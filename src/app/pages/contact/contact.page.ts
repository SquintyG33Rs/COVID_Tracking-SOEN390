import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from "../../entities/User";
import { DatabaseService } from "../../database-services/database.service";
import { AccountType } from 'src/app/entities/AccountType';
import { Router } from "@angular/router";
import { MedicalCommunication } from 'src/app/entities/MedicalCommunication';
import { TouchSequence } from 'selenium-webdriver';
import { Pipe, PipeTransform } from '@angular/core';



/*@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.title.indexOf(filter.title) !== -1);
    }
}*/



@Component({
    selector: 'app-appointment',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.scss'],
})

export class ContactPage implements OnInit{
    public activeUser: User;
    public targetUser:User;
    date:Date;
    private router:Router;
    successfulMessage:boolean=false;
    messages=[];
    message:string;
    isPatient:boolean=false;
    isMedicalDoctor:boolean=false;
    targetUsername:string;
    patients=[];
    

    constructor(private databaseService:DatabaseService, router:Router){
        this.databaseService=databaseService;
        this.activeUser=this.databaseService.activeUser;
        this.router=router;
        this.targetUsername="patient.username"
        //Getting all messages that the active user is in.
        //Will be modified later so that the messages are the ones that has the patient or  it's doctor
        for(let i=0;i<this.databaseService.messages.length;i++){
            if(this.databaseService.messages[i].sender==this.activeUser || 
                this.databaseService.messages[i].receiver==this.activeUser){
                    this.messages.push(this.databaseService.messages[i])
                }
        }
        
        //Sort the messages by date
        this.messages.sort((a, b) => a.date - b.date);

        //If the user is a patient, the target user is his doctor
        //Need to be modified later because now the target doctor will always be the default one

        if(this.activeUser.accountType==AccountType.PATIENT){
            this.targetUser=this.databaseService.users[1];
            this.isPatient=true;
        }

        //If user is a doctor
        if(this.activeUser.accountType==AccountType.MEDICALDOCTOR){
            this.isMedicalDoctor=true;

            //Get all patients,should modified later so that the doctor get his assigned patients
            for(let i=0; i<this.databaseService.users.length;i++){
                //console.log(this.databaseService.users[i].accountType);
                if(this.databaseService.users[i].accountType==AccountType.PATIENT){
                    //var x= this.databaseService.users[i].firstName+" "+this.databaseService.users[i].lastName
                    this.patients.push(this.databaseService.users[i]);
                    //console.log("yes");
                }
            }

        }   
    }

    sendMessage(){
        this.date=new Date();
        

        //Finding the patient
        if(this.isMedicalDoctor){
            for(let i=0; i<this.databaseService.users.length;i++){
                if(this.databaseService.users[i].username==this.targetUsername){
                    this.targetUser=this.databaseService.users[i];
                }
            }
        }


        const newMessage:MedicalCommunication=new MedicalCommunication(this.activeUser,this.targetUser,this.date,this.message);
        this.databaseService.messages.push(newMessage);
        this.successfulMessage=true;
        setTimeout(() => { this.router.navigate(['home-page'],{skipLocationChange: true}).then(() => this.router.navigate(['contact'])); }, 1000); //should change this, it must only refresh the same page
    }
    
    filterMessages(username){
        this.targetUsername=username;
        var messagesList=document.getElementsByClassName("Messages") as HTMLCollectionOf<HTMLElement>;

        for(let i=0;i<messagesList.length;i++){
            var sender=messagesList[i].dataset.sender;
            var receiver=messagesList[i].dataset.receiver;
            if(sender==this.targetUsername || receiver==this.targetUsername){
                messagesList[i].style.display="";
            }
            else[
                messagesList[i].style.display="none"
            ]
        }
    }
    resetTarget(){
        this.targetUsername="patient.username"
        var messagesList=document.getElementsByClassName("Messages") as HTMLCollectionOf<HTMLElement>;
        for(let i=0;i<messagesList.length;i++){
            messagesList[i].style.display=""
        }
    }
    ngOnInit() {
        
    }
}