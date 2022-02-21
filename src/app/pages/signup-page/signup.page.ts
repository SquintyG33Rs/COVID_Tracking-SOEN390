import { AccountType } from './../../entities/AccountType';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../database-services/database.service";
import { User } from "../../entities/User";
import { Router } from "@angular/router";



@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit 
{
  private databaseService;
  private router: Router;
  successfulSignup: boolean = false;

  username: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: AccountType;
  telephone: string;
  email: string;
  address: string;

  constructor(databaseService: DatabaseService, router: Router) 
  {
    this.databaseService = databaseService;
    this.router = router;
  }

  ngOnInit() {}

  onSignup() 
  {
    const signupUser: User = new User(this.username, this.password, this.firstName, this.lastName, this.accountType, this.telephone, this.email, this.address);
    this.databaseService.users.push(signupUser);
    this.successfulSignup = true;
    console.log("Sign-up User:");
    console.log(signupUser);
    setTimeout(() => { this.router.navigate(['welcome-page']).then(() => console.log("Route Back To Welcome Page.")); }, 3000);
  }
}
