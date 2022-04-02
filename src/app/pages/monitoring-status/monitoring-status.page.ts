import { Component, OnInit } from '@angular/core';
import { Endpoints } from 'src/app/app-endpoints';


@Component({
  selector: 'app-monitoring-status',
  templateUrl: './monitoring-status.page.html',
  styleUrls: ['./monitoring-status.page.scss'],
})
export class MonitoringStatusPage implements OnInit {
  private activeUser: any;
  private updates: any;
  private patients: any;
  private fullPatientList = [];
  private complete = false;
  sortBy = require('sortby');
  //private endpoint: Endpoint;
  constructor(private endpoints: Endpoints) {
    this.activeUser = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit() {
    if (this.activeUser.account_type == "MEDICALDOCTOR") {
      this.endpoints.getDoctorByUserId(this.activeUser.id).subscribe(
        res => {
          //sort updates by
          this.patients = res[0].patients;
          this.endpoints.getUpdates().subscribe((statuses) => {
            this.endpoints.getUsers().subscribe((users) => {
              this.endpoints.getPatients().subscribe( (allPatients) => {
                this.patients.forEach(element => {
                  //console.log(element)
                  var foundUser = users.find(x => x.id == element.is_user);
                  var foundStatus = statuses.find(x => x.id == element.status);
                  var foundPatient = allPatients.find(x => x.id == element.id);

                  if (foundStatus) {
                    var date = new Date(Date.parse(foundStatus.date));
                    var humandDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getUTCFullYear();
                    foundStatus.date = humandDate
                  }

                  if (foundPatient.status_history) {
                    foundPatient.status_history.sort((a, b) => parseInt(b.id) - parseInt(a.id))
                    foundPatient.status_history.shift();
                    foundPatient.status_history.forEach(elem => {
                      var date = new Date(Date.parse(elem.date));
                      var humandDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getUTCFullYear();
                      elem.date = humandDate;
                    })
                  }
                  
                  var user = {
                    email: foundUser.email,
                    first_name: foundUser.first_name,
                    last_name: foundUser.last_name,
                    status: foundStatus,
                    status_history: foundPatient.status_history,
                    show: false
                    
                  };
                  this.fullPatientList.push(user);
                  
                });
                this.complete = true;
              });
            });
          });
  
        },
        err => console.log(err))
    }

  }

  toggle(patient) {
    patient.show = !patient.show;
  }


}
