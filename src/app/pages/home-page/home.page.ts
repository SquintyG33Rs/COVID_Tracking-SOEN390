import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../database-services/database.service";
import {User} from "../../entities/User";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private databaseService;
  private activeUser: User;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  ngOnInit() {
    this.activeUser = this.databaseService.activeUser;
    console.log(this.activeUser);
  }
}
