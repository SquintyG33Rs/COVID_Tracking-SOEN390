import { AccountType } from '../../entities/AccountType';
import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Update } from '../../entities/Update';
import { Endpoints } from '../../app-endpoints';
import {Router} from '@angular/router';


@Component({
  selector: 'app-status-update',
  templateUrl: './status-update.page.html',
  styleUrls: ['./status-update.page.scss'],
})

export class StatusUpdatePage implements OnInit{
  private router: Router;
  private endpoints: Endpoints;
  private update;

  updateForm: FormGroup;

  date: Date;
  temp: number;
  weight: number;
  cough: boolean;
  head: boolean;
  throat: boolean;
  fever: boolean;
  taste: boolean;
  tired: boolean;

  private updates: any = [];
  private patientUpdates: any = [];
  private activeUser: any;
  private activePatient: any;
  sortBy = require('sortby');




  constructor(endpoints: Endpoints, router: Router) {
    this.endpoints = endpoints;
    this.router = router;
  }





  async ngOnUpdate(){
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    //get active patient
    this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
      data => {
        this.activePatient = data[0];

        console.log(this.activePatient);

        this.update = null;
        //create a new status update
        const statusUpdate: Update = new Update(this.date, this.temp, this.weight, this.cough, this.head, this.throat, this.fever, this.taste, this.tired);
        //store status update in database
        this.endpoints.createStatusWithParams(statusUpdate.date, statusUpdate.temp, statusUpdate.weight, statusUpdate.cough, statusUpdate.head, statusUpdate.throat, statusUpdate.fever, statusUpdate.taste, statusUpdate.tired).subscribe(
          (data) => {
            this.update = data;
            console.log(this.update);
            console.log(data);
            localStorage.setItem('update', JSON.stringify(data.update));
            //console.log('Status Updated!');

            //edit current status
            this.endpoints.modifyPatientStatus(this.activePatient.id, this.update.id).subscribe(

              () => {
                //push status in active patient's status history
                this.activePatient.status_history.push(this.update);

                console.log(this.activePatient.status_history);


                //add status to history
                this.endpoints.modifyPatientStatusHistory(this.activePatient.id, this.activePatient.status_history).subscribe(

                  (data) =>{
                    console.log(JSON.stringify(data));
                  },err => console.log(err)
                )
              },err => console.log(err)
            )
            //this.router.navigate(['/home-page']).then(() => console.log('Status Updated!'));
            window.location.reload();

          },err => console.log(err)


        );



      },err => console.log(err)
    )



  }


   onSubmit(){/*
		console.log('button click');
		console.log(this.updateForm.value);
		*/
  }


  ngOnInit() {/*
  	this.updateForm = new FormGroup({
  	date : new FormControl(),
	temp : new FormControl(),
	weight : new FormControl(),
	cough : new FormControl(),
	head : new FormControl(),
	throat : new FormControl(),
	fever : new FormControl(),
	taste : new FormControl(),
	tired : new FormControl()
  });
  */
    //get the authenticated user
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')));

    if (this.activeUser.account_type === 'PATIENT')
        {
          this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
            data => {
              this.activePatient = data[0];
              console.log(this.activePatient);

              //active patient's status history
              this.patientUpdates = this.activePatient.status_history.sort(this.sortBy({created_at: -1}));
              console.log(this.activePatient.status_history);

            },err => console.log(err)
          )
        }

    else
        {
          this.endpoints.getUpdates().subscribe(
            res => {
              //sort updates by
              this.updates = res.sort(this.sortBy({created_at: -1}));
              console.log(this.updates);

            },
            err => console.log(err)
          );
        }
  }

}
