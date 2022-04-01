import { AccountType } from './../../entities/AccountType';
import { Component, OnInit } from '@angular/core';
import { Endpoints } from "../../app-endpoints";
import { User } from "../../entities/User";
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
  accountType: AccountType;

  constructor(router: Router, endpoints: Endpoints)
  {
    this.endpoint = endpoints;
  }

  ngOnInit() { }

  async onSignin()
  {
    this.user = null;
    this.endpoint.login(this.username, this.password).subscribe((data) => {
      console.log(data)
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data['user']))
      localStorage.setItem('jwt', JSON.stringify(data['jwt']))
      console.log("Sign-in User:");
      console.log(JSON.parse(localStorage.getItem('user')));
      //this.endpoints.activeUser = JSON.parse(localStorage.getItem('user'));
      console.log('Route Forward To Home Page.');
      window.location.assign('/home-page');
    }, error => {
      console.log(error.error.message[0].messages[0].id)
    });
  }
}
