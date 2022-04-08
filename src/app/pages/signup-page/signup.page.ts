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
    if (this.firstName == undefined || this.firstName.length == 0) {
      alert("The first name field is mandatory");
      return;
    }

    if (this.lastName == undefined || this.lastName.length == 0) {
      alert("The last name field is mandatory");
      return;
    }

    if (this.email == undefined || this.email.length == 0) {
      alert("The email field is mandatory");
      return;
    }

    var emailregexp = new RegExp("^[^@]+@[^@]+\.[^@]+$");
    if(!emailregexp.test(this.email)){
        alert("Email is wrongly formated. Verify that you have typed it correctly")
        return;
    }
    
    if (this.username == undefined || this.username.length == 0) {
      alert("The username field is mandatory");
      return;
    }

    if(this.username.length<5 || this.username.length > 32){
      alert("The username must be between 5 and 32 characters long");
      return;
    }
    
    if (this.password == undefined || this.password.length == 0) {
      alert("The password field is mandatory");
      return;
    }

    if(this.password.length<5 || this.password.length > 32){
      alert("The password must be between 5 and 32 characters long");
      return;
    }

    //Password strength checks/incorrect character tests here perhaps?

    if (this.address == undefined || this.address.length == 0) {
      alert("The address field is mandatory");
      return;
    }

    if (this.telephone == undefined || this.telephone.length == 0) {
      alert("The telephone field is mandatory");
      return;
    }
    
    var telregexp = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    if(!telregexp.test(this.telephone)){
        alert("Telephone is wrongly formated. Verify that you have typed it correctly")
        return;
    }


    this.user = null;
    const signupUser: User = new User(this.username, this.password, this.firstName, this.lastName, this.accountType, this.telephone, this.email, this.address);
    this.endpoints.createUser(signupUser).subscribe((data) => {
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('jwt', JSON.stringify(data.jwt));


      if (signupUser.accountType === AccountType.PATIENT) {
        const userid = data.user.id;
        this.endpoints.createPatient(userid).subscribe((data) => {
          console.log(data);
          console.log('Sign-in User:');
          console.log(JSON.parse(localStorage.getItem('user')));
          //this.endpoints.activeUser = JSON.parse(localStorage.getItem('user'));
          console.log('Route Forward To Sign-In Page.');
          window.location.assign('/signin-page');
        });
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
