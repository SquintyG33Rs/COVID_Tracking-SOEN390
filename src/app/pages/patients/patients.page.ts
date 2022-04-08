import { Component, OnInit } from '@angular/core';
import { Endpoints } from 'src/app/app-endpoints';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  private activeUser;
  private fullPatientList = [];
  private patients: any;
  private dateArray = [];
  
  constructor(private endpoints: Endpoints) {}

  test() 
  {
    console.log('my test works');
  }

  delete(i) 
  {
    console.log('my delete works');
  }

  flagPatient(patient) 
  {
    this.endpoints.flagPatient(patient.patient.id, true).subscribe( (data) => {
      this.flagAllInteractions(data);
      console.log(patient);
      this.endpoints.sendFlaggedNotification(patient.user).subscribe();
      patient.patient.flagged = true;
    });
  }

  //check past interactions to check if they've come into contact with someone else.
  flagAllInteractions(patient) 
  {
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

  checkForContacts(patient) 
  {
    this.endpoints.getInteractions().subscribe((data) => {
      patient.interactions.forEach(interaction => {
        this.endpoints.getInteractionsByLocation(interaction.location).subscribe((data) => {
          var start1 = Date.parse(interaction.start);
          var end1 = Date.parse(interaction.end);

          for(const element of data) 
          {
            var start2 = Date.parse(element.start);
            var end2 = Date.parse(element.end)
            if (interaction.flagged && element.patient.id != patient.id && !element.flagged) //flagged patient changed location, check for possible contacts with non flagged patients
            {
              if (Math.min(end1, end2) - Math.max(start1, start2) > 900) 
              { //stayed in contact for 15m
                this.endpoints.getPatientByPatientId(element.patient.id).subscribe(async (data) => {
                  var date = new Date(Date.parse(interaction.start));
                  var humanDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getUTCFullYear();
                  var foundDate = data.notified.find(x => x.date == humanDate);
                  var secondCheck = this.dateArray.find(x => x == humanDate);
                  if (!foundDate && !secondCheck) 
                  {
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

  unflagPatient(patient) 
  {
    this.endpoints.flagPatient(patient.patient.id, false).subscribe(() => {
      patient.patient.flagged = false;
    });
  }


  ngOnInit() 
  {
    this.activeUser = JSON.parse(localStorage.getItem('user'));

    this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
    res => 
    {
      //sort updates by
      this.patients = res[0].patients;

      this.endpoints.getUsers().subscribe((users) => {
        this.patients.forEach(element => 
          {
            var foundUser = users.find(x => x.id == element.is_user);
            var user = {
              user: foundUser,
              patient: element
            };
            this.fullPatientList.push(user);  
          });
        console.log(this.fullPatientList);
      });
    },err => console.log(err))
  }
}
