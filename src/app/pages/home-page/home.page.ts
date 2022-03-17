import { MyServiceEvent, RouteChangeDetection } from './../../scripts/RouteChangeListener';
import { Component, OnInit } from '@angular/core';
import { Endpoints } from "../../app-endpoints";
import { User } from "../../entities/User";
import { Router } from "@angular/router";
import { AccountType } from 'src/app/entities/AccountType';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit 
{
  private endpoint;
  private serviceSubscription: Subscription;
  private activeUser;
  currentRouteURL: String;
  urlDetector: RouteChangeDetection = new RouteChangeDetection(this.router);
  

  constructor(private endpoints: Endpoints, private router: Router)
  {
    this.endpoint = endpoints;

    this.serviceSubscription = this.urlDetector.onChange.subscribe({
      next: (event: MyServiceEvent) => {
        this.onChangeRouteDetection(event.message);
      }
  })
  }

  onChangeRouteDetection(message:string)
  {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')))
    if (message === '/home-page')
    {
      /*switch (this.activeUser.accountType)
      {    
        case AccountType.ADMIN:
        break;
        case AccountType.MEDICALDOCTOR:
          console.log("Hello Doctor!");
          
            //Doctor code goes here 
        
        break;
        case AccountType.HEALTHOFFICIAL: 
        break;
        case AccountType.IMMIGRATIONOFFICER:
        break;
        case AccountType.PATIENT:
          console.log("Hello Patient!");
          
            //Patient code goes here etc.
           
        break;
      }
      */
    }
  }

  ngOnInit() 
  {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log("log user:");
    console.log(this.activeUser.last_name);
  }

  logOut() 
  {
    this.endpoint.activeUser = null;
    this.activeUser = null;
    localStorage.clear();
    this.router.navigateByUrl("/welcome-page");
    console.log("Active User:");
    console.log(this.activeUser);
  }
}