import { AccountType } from './../../entities/AccountType';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database-services/database.service";
import { User } from "../../entities/User";
import { Router } from "@angular/router";
import { ShowHidePasswordComponent } from './show-hide-password.component';


@Component({
  selector: 'app-signin-page',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  private databaseService;
  private router: Router;

  username: string;
  password: string;
  accountType: AccountType;

  constructor(databaseService: DatabaseService, router: Router)
  {
    this.databaseService = databaseService;
    this.router = router;
  }

  ngOnInit() { }

  onSignin() 
  {
    const signInUser: User = this.databaseService.findUser(this.username, this.password, this.accountType)
    if(signInUser) {
      console.log("Sign-in User:");
      console.log(signInUser);
      this.router.navigate(['home-page']).then(() => console.log("Route Forward To Home Page."));
    }
  }
}
