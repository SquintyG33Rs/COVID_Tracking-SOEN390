import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {User} from "../../app/entities/User";
import {DatabaseService} from "../../app/database-services/database.service";



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private databaseService;
  private activeUser: User;


  constructor(public navCtrl: NavController, databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  ngOnInit() {
    this.activeUser = this.databaseService.activeUser;
    console.log(this.activeUser);
  }
}
