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
  private router: Router;
  private user;

  username: string;
  password: string;
  accountType: AccountType;

  constructor(router: Router, endpoints: Endpoints)
  {
    this.endpoint = endpoints;
    this.router = router;
  }

  ngOnInit() { }

  async onSignin() 
  {
    this.user = null;
    this.endpoint.login(this.username, this.password).subscribe((data) => {
      this.user = data;
      console.log(data)
    })
    await new Promise(resolve => setTimeout(resolve, 500));
    if(this.user !== null) {
      console.log("Sign-in User:");
      this.endpoint.activeUser = this.user;
      this.router.navigate(['home-page']).then(() => console.log("Route Forward To Home Page."));
    }
  }
}
