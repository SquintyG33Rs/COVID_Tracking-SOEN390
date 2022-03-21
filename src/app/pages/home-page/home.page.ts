import { MyServiceEvent, RouteChangeDetection } from '../../scripts/RouteChangeListener';
import { Component, OnInit } from '@angular/core';
import { Endpoints } from '../../app-endpoints';
import { User } from '../../entities/User';
import { Router } from '@angular/router';
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
  private activePatient;
  private activeDoctor;
  currentRouteURL: String;
  urlDetector: RouteChangeDetection = new RouteChangeDetection(this.router);


  constructor(private endpoints: Endpoints, private router: Router)
  {
    this.endpoint = endpoints;

    this.serviceSubscription = this.urlDetector.onChange.subscribe({
      next: (event: MyServiceEvent) => {
        this.onChangeRouteDetection(event.message);
      }
  });
  }

  onChangeRouteDetection(message: string)
  {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.activeUser);
    if (this.activeUser !== null) {
      if (this.activeUser.account_type === 'PATIENT') {
        this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
          data => {
            this.activePatient = data[0];
            console.log(this.activePatient);
          }
        )

      }

      if (this.activeUser.account_type === 'MEDICALDOCTOR') {
        this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
          data => {
            this.activeDoctor = data[0];
            console.log(this.activeDoctor);
          }
        )
      }
    }
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
    console.log('log user:');
    console.log(this.activeUser.first_name + " " + this.activeUser.last_name);

/*
    if (this.activeUser.account_type === 'PATIENT')
    {
      this.endpoints.getPatientByUserId(this.activeUser.id).subscribe(
        data => {
          this.activePatient = data[0];
          console.log(this.activePatient);
        }
      )
    }

    if (this.activeUser.account_type === 'MEDICALDOCTOR')
    {
      this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
        data => {
          this.activeDoctor = data[0];
          console.log(this.activeDoctor);
        }
      )
    }
*/





  }

  logOut()
  {
    this.endpoint.activeUser = null;
    this.activeUser = null;
    localStorage.clear();
    this.router.navigateByUrl('/welcome-page');
    console.log('Logged out!');
    console.log(this.activeUser);
  }
}
