import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatabaseService} from "../../database-services/database.service";
import {User} from "../../entities/User";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor() { }

  ngOnInit() { }

}
