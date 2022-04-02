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
  private complete = false;
  private fullPatientList = [];
  private patients: any;
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
    
    this.activeUser = JSON.parse(localStorage.getItem('user'));
    //console.log(JSON.parse(localStorage.getItem('user')));
    
    if (this.activeUser.account_type == "MEDICALDOCTOR") {
      this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
        res => {
          //sort updates by
          this.patients = res[0].patients;

          this.endpoints.getUsers().subscribe((users) => {
            this.endpoints.getPatients().subscribe( (allPatients) => {
              this.patients.forEach(element => {
                //console.log(element)
                var foundUser = users.find(x => x.id == element.is_user);
                var foundPatient = allPatients.find(x => x.id == element.id);
                
                var user = {
                  user: foundUser,
                  patient: element,
                  //show: false
                };
                this.fullPatientList.push(user);
                
              });
              console.log(this.fullPatientList);
              this.complete = true;
            });
          });
  
        },
        err => console.log(err))
    }
  }
  
}
