import { AccountType } from '../../entities/AccountType';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/User';
import { Router } from '@angular/router';
import { Endpoints } from '../../app-endpoints';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit
{
  private router: Router;
  successfulSignup = false;
  private endpoints: Endpoints;
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
    this.endpoints.createUser(signupUser).subscribe((data) => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('jwt', JSON.stringify(data.jwt));


      if (signupUser.accountType === AccountType.PATIENT) {
        const userid = data.user.id;
        this.endpoints.createStatus().subscribe((data) => {
          console.log(data);
          const statusid = data.id;
          this.endpoints.createPatient(userid, statusid).subscribe((data) => {
            console.log(data);
            console.log('Sign-in User:');
            console.log(JSON.parse(localStorage.getItem('user')));
            //this.endpoints.activeUser = JSON.parse(localStorage.getItem('user'));
            console.log('Route Forward To Sign-In Page.');
            window.location.assign('/signin-page');
          });
        }, error => {console.log(error.error.message[0].messages[0].id);});
      }
      else if (signupUser.accountType == AccountType.MEDICALDOCTOR) {
        const userid = data.user.id;
        this.endpoints.createDoctor(userid).subscribe((data) => {
          console.log(data);
          console.log('Sign-in User:');
          console.log(JSON.parse(localStorage.getItem('user')));
          //this.endpoints.activeUser = JSON.parse(localStorage.getItem('user'));
          console.log('Route Forward To Sign-In Page.');
          window.location.assign('/signin-page');
        }, error => {console.log(error.error.message[0].messages[0].id);});
      }
      else {
        console.log('Sign-in User:');
        console.log(JSON.parse(localStorage.getItem('user')));
        //this.endpoints.activeUser = JSON.parse(localStorage.getItem('user'));
        console.log('Route Forward To Sign-In Page.');
        window.location.assign('/signin-page');
      }
    }, error => {console.log(error.error.message[0].messages[0].id);});


  }
}
