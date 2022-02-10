import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	loginForm = this.formBuilder.group({
		email:'',
		pssw:''
	});

	constructor(public navCtrl: NavController , private formBuilder: FormBuilder) {

	}

	onSubmit(){

		console.log("button click");
		console.log(this.loginForm.value);
		this.loginForm.reset();
		//router.post("Dunand","Simon","password","patient","5141234567","simon@concordia.com","some address");
		// lastName VARCHAR(25),
		// firstName VARCHAR(25),
		// password VARCHAR(25),
		// accountType VARCHAR(25),
		// telephone varchar(25),
		// email VARCHAR(25),
		// address varchar(255)
	}

}