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
  private dateArray = [];
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

  flagPatient(patient) {
    this.endpoints.flagPatient(patient.patient.id, true).subscribe( (data) => {
      this.flagAllInteractions(data);
      console.log(patient);
      this.endpoints.sendFlaggedNotification(patient.user).subscribe();
      patient.patient.flagged = true;
    });
    
  }

  //check past interactions to check if they've come into contact with someone else.
  flagAllInteractions(patient) {
    console.log(patient);
    var i = 0;
    patient.interactions.forEach(elem => {
      this.endpoints.flagInteraction(elem.id, true).subscribe((data) => {
        i++;
        if (i == patient.interactions.length) {
          this.checkForContacts(patient);
        }
      })
    })
  }

  checkForContacts(patient) {
    //console.log(patient)
    this.endpoints.getInteractions().subscribe((data) => {
      patient.interactions.forEach(interaction => {
        this.endpoints.getInteractionsByLocation(interaction.location).subscribe((data) => {
          var start1 = Date.parse(interaction.start);
          var end1 = Date.parse(interaction.end);

          for(const element of data) {
              var start2 = Date.parse(element.start);
              var end2 = Date.parse(element.end)
              //console.log(element);
              if (interaction.flagged && element.patient.id != patient.id && !element.flagged) {//flagged patient changed location, check for possible contacts with non flagged patients
                if (Math.min(end1, end2) - Math.max(start1, start2) > 900) { //stayed in contact for 15m
                  this.endpoints.getPatientByPatientId(element.patient.id).subscribe(async (data) => {
                    var date = new Date(Date.parse(interaction.start));
                    var humanDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getUTCFullYear();
                    var foundDate = data.notified.find(x => x.date == humanDate);
                    var secondCheck = this.dateArray.find(x => x == humanDate);
                    //console.log(secondCheck)
                    if (!foundDate && !secondCheck) {
                      //Not notified for this day yet
                      this.dateArray.push(humanDate);
                      this.endpoints.sendCovidNotification(data.is_user, element).subscribe();
                      var notifyDate = {
                      date: humanDate
                      }
                      this.endpoints.addNotifyPatient(data, notifyDate).subscribe();
                    }

                  });

                }
              }
          }

          
        });
      });
    });
    
  }

  unflagPatient(patient) {
    this.endpoints.flagPatient(patient.patient.id, false).subscribe(() => {
      patient.patient.flagged = false;
    });
    
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
                //var foundPatient = allPatients.find(x => x.id == element.id);
                
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
