import { Component, OnInit } from '@angular/core';
import { User } from "../../entities/User";
import { DatabaseService } from "../../database-services/database.service";
//import { Endpoint } from "../../app-endpoint.js";

@Component({
  selector: 'app-monitoring-status',
  templateUrl: './monitoring-status.page.html',
  styleUrls: ['./monitoring-status.page.scss'],
})
export class MonitoringStatusPage implements OnInit {
  private activeUser: User;
  //private endpoint: Endpoint;
  constructor(private databaseService: DatabaseService) {
    this.databaseService = databaseService;
   }

  ngOnInit() {
    //this.activeUser = this.endpoint.getUserById(1);
  }

}
