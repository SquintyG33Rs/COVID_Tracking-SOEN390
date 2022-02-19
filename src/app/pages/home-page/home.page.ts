import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../database-services/database.service";
import {User} from "../../entities/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private databaseService;
  private activeUser: User;

  constructor(databaseService: DatabaseService, private router: Router) {
    this.databaseService = databaseService;
  }

  ngOnInit() {
    this.activeUser = this.databaseService.activeUser;
    console.log(this.activeUser);
  }

  logOut() {
    this.databaseService.activeUser = null;
    localStorage.clear();
    this.router.navigateByUrl("/welcome-page");
  }
}
