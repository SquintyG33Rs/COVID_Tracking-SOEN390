import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

	addUserTest(){
		console.log("button click");
		var email = (<HTMLInputElement>document.getElementById("email")).value;
		var pssw = (<HTMLInputElement>document.getElementById("pssw")).value; 


		console.log(email + " " + pssw);
		//router.post("Dunand","Simon","password","patient","5141234567","simon@concordia.com","some address");
		// lastName VARCHAR(25),
		// firstName VARCHAR(25),
		// password VARCHAR(25),
		// accountType VARCHAR(25),
		// telephone varchar(25),
		// email VARCHAR(25),
		// address varchar(255)

	}

  login() {

  }
}