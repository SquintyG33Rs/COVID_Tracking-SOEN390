import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-status-update',
  templateUrl: './status-update.page.html',
  styleUrls: ['./status-update.page.scss'],
})

export class StatusUpdatePage implements OnInit{
  private updateForm : FormGroup;
  constructor() {
  }


  onSubmit(){
		console.log("button click");
		console.log(this.updateForm.value);
  }
  ngOnInit() {
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
  }

}
