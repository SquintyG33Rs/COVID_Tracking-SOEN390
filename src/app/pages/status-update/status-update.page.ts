import { AccountType } from './../../entities/AccountType';
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







  constructor(endpoints: Endpoints, router: Router) {
    this.endpoints = endpoints;
    this.router = router;
  }





  async ngOnUpdate(){
    this.update = null;
        const statusUpdate: Update = new Update(this.date, this.temp, this.weight, this.cough, this.head, this.throat, this.fever, this.taste, this.tired);

    this.endpoints.createStatusWithParams(statusUpdate.date, statusUpdate.temp, statusUpdate.weight, statusUpdate.cough, statusUpdate.head, statusUpdate.throat, statusUpdate.fever, statusUpdate.taste, statusUpdate.tired).subscribe(
      (data) => {
        this.update = data;
        console.log(this.update);
        console.log(data);
        localStorage.setItem('update', JSON.stringify(data.update));
        console.log('Status Updated!');


      }


    );


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
  }

}
