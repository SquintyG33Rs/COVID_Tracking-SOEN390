import { AccountType } from './../../entities/AccountType';
import { Component, OnInit } from '@angular/core';
import { User } from "../../entities/User";
import { Router } from "@angular/router";
import { Endpoints } from '../../app-endpoints'


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit 
{
  private router: Router;
  successfulSignup: boolean = false;
  endpoints: Endpoints;
  private user;

  username: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: AccountType;
  telephone: string;
  email: string;
  address: string;

  constructor(endpoints: Endpoints, router: Router) 
  {
    this.endpoints = endpoints;
    this.router = router;
  }

  ngOnInit() {}

  async onSignup() 
  {
    
    this.user = null;
    const signupUser: User = new User(this.username, this.password, this.firstName, this.lastName, this.accountType, this.telephone, this.email, this.address);
    console.log((signupUser.accountType == AccountType.PATIENT))
    this.endpoints.createUser(signupUser).subscribe((data) => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data['user']))
      localStorage.setItem('jwt', JSON.stringify(data['jwt']))
      console.log(data)

      
      if (signupUser.accountType == AccountType.PATIENT) {
        let userid = data.user.id
        this.endpoints.createPatient(userid).subscribe((data) => {
          console.log(data);
        }, error => {console.log(error.error.message[0].messages[0].id)});
      }
      else if (signupUser.accountType == AccountType.MEDICALDOCTOR) {
        let userid = data.user.id
        this.endpoints.createDoctor(userid).subscribe((data) => {
          console.log(data);
        }, error => {console.log(error.error.message[0].messages[0].id)});
      }


      console.log("Sign-in User:");
      console.log(JSON.parse(localStorage.getItem('user')));
      //this.endpoints.activeUser = JSON.parse(localStorage.getItem('user'));
      this.router.navigate(['home-page']).then(() => console.log("Route Forward To Home Page."));
    }, error => {console.log(error.error.message[0].messages[0].id)});

    
  }
}
