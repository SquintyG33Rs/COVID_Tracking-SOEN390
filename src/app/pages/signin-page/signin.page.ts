import { Component, OnInit } from '@angular/core';
import { Endpoints } from "../../app-endpoints";
import { Router } from "@angular/router";
import { ShowHidePasswordComponent } from './show-hide-password.component';


@Component({
  selector: 'app-signin-page',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  private endpoint;
  private user;

  username: string;
  password: string;

  constructor(router: Router, endpoints: Endpoints)
  {
    this.endpoint = endpoints;
  }

  ngOnInit() { }

  async onSignin()
  {
    if(this.username == undefined || this.username.length < 5 || this.username.length > 32){
        alert("The username should be between 5 and 32 characters in length");
        return;
    }
    if(this.password == undefined || this.password.length < 5 || this.password.length > 32){
        alert("The password should be between 5 and 32 characters in length");
        return;
    }
    this.user = null;
    this.endpoint.login(this.username, this.password).subscribe((data) => {
      console.log(data)
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data['user']))
      localStorage.setItem('jwt', JSON.stringify(data['jwt']))
      //console.log("Sign-in User:");
      //console.log(JSON.parse(localStorage.getItem('user')));
      //this.endpoints.activeUser = JSON.parse(localStorage.getItem('user'));
      console.log('Route Forward To Home Page.');
      window.location.assign('/home-page');
    }, error => {
      let err = error.error.message[0].messages[0].id;
      if (err = "Auth.form.error.email.provide"){
        alert("Wrong username or password");
      } else {
        alert("Login Failed");
      }
    });
  }
}
