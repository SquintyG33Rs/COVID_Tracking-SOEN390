import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BreadcrumbCollapsedClickEventDetail, IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { Endpoints } from '../../app-endpoints';
import { Subscription } from 'rxjs';
import { MyServiceEvent, RouteChangeDetection } from '../../scripts/RouteChangeListener';

@Component({
    selector: 'app-manage-profiles',
    templateUrl: './manageprofiles.page.html',
    styleUrls: ['./manageprofiles.page.scss'],
})
export class ManageProfilesPage implements OnInit{
    private endpoint;
    private serviceSubscription: Subscription;
    urlDetector: RouteChangeDetection = new RouteChangeDetection(this.router);
    private activeUser;
    private clicked: boolean = false;
    private users;
    private displayedUsers;
    private items: HTMLIonListElement[] = Array.from(document.querySelector('ion-list').children) as HTMLIonListElement[];
    private editedUser;
    private editedUserIndex: number = 0;


    constructor(private endpoints: Endpoints, private router: Router){
        this.endpoint = endpoints;
        this.activeUser = JSON.parse(localStorage.getItem('user'));
        this.serviceSubscription = this.urlDetector.onChange.subscribe({
            next: (event: MyServiceEvent) => {
              this.onChangeRouteDetection(event.message);
            }
        });
    }

    onChangeRouteDetection(message: string)
  {


  }
    
    ngOnInit() 
    {
        this.endpoints.getUsers().subscribe(
            data => {
              this.users = data;
              this.displayedUsers = data;
            },err => console.log(err)
          )
    }

    search(query:string)
    {
        this.displayedUsers = this.users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()));
        this.clicked = false;
    }

    buttonClick(user, i:number)
    {  
        this.editedUser = user;
        this.editedUserIndex = i;
        this.clicked = true;
    }

    submit()
    {
        this.endpoints.modifyUser(this.editedUser).subscribe((data) => {
            if (this.activeUser.id == this.editedUser.id) {
                //update local user
                this.endpoints.getUserById(this.activeUser.id).subscribe((data) => {
                    localStorage.setItem('user', JSON.stringify(data));
                    this.router.navigate(['home-page']).then(() => { window.location.reload() });
                })
            }
            else {
                this.router.navigate(['home-page']);
            }
        });

        
    }
}



