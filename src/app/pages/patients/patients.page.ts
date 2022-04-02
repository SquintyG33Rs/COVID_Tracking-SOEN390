import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Endpoints } from 'src/app/app-endpoints';
import { DatabaseService } from 'src/app/database-services/database.service';
import { MyServiceEvent, RouteChangeDetection } from 'src/app/scripts/RouteChangeListener';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  private activeUser;
  private activeDoctor: any;
  private userIdArray = [];
  private static patientArray :string [] = [];
  items = ['Patient1FirstName    Patient1LastName ID', 'Patient2FirstName    Patient2LastName ID', 'Patient3FirstName    Patient3LastName ID', 'Patient4FirstName    Patient4LastName ID'];
  private serviceSubscription: Subscription;
  private urlDetector: RouteChangeDetection; 

  constructor(private endpoints: Endpoints,private router: Router,private databaseService: DatabaseService) 
  {
    /*
    this.databaseService = databaseService;
    this.router = router;
    this.endpoints = endpoints;
    this.urlDetector =  new RouteChangeDetection(this.router);
    this.serviceSubscription = this.urlDetector.onChange.subscribe({
      next: (event: MyServiceEvent) => 
      {
        this.onChangeRouteDetection(event.message);
      }});
    */
  }

  onChangeRouteDetection(message: any) 
  {
    if (message == "/patients")
    {}
    
  }


  test() 
  {
    console.log('my test works');
  }

  delete(i) 
  {
    console.log('my delete works');
    this.items.splice(i, 1);
  }




  ngOnInit() 
  {
    /*
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('user')));
    
    this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
        data => 
        {
          this.activeDoctor = data[0];
          
          for (let i = 0; i < this.activeDoctor.patients.length; i++) 
          {
            this.endpoints.getPatientByUserId(this.activeDoctor.patients[i].is_user).subscribe(
              data => 
              {
                var patient = data[0].is_user;
                let listEntry: string | number;
                listEntry = patient.first_name + " " + patient.last_name + " " +patient.id;
                console.log("listEntry");
                console.log(listEntry);
                PatientsPage.patientArray.push(listEntry.toString());
                
                if(i == this.activeDoctor.patients.length - 1)
                {
                  populate(PatientsPage.patientArray);
                }
          

              },err => console.log(err)
            )
            
          }

          
        },err => console.log(err)
      )*/
  }
  
}
function populate(patientArray: string[]) {
  //Tried to dynamicall create list, but attributes liks (click) or <ion-swipe> do not work...
  let list = document.getElementById('patientList');
  patientArray.forEach(patient => {

    let ionItem = document.createElement("ion-item");
    ionItem.innerHTML = "<ion-label>"+patient+"</ion-label>";
    console.log(ionItem.innerHTML);

    list.appendChild(ionItem);
  });
}

