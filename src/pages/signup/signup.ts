import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseService} from "../../app/database-services/database.service";
import {User} from "../../app/entities/User";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  // private router: Router;
  successfulSignup: boolean = false;

  username: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: string;
  telephone: string;
  email: string;
  address: string;

  accountTypes: string[] = ["ADMIN", "MEDICALDOCTOR", "HEALTHOFFICIAL", "IMMIGRATIONOFFICER", "PATIENT"];

  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseService: DatabaseService) {   // router: Router
    // this.databaseService = databaseService;
    // this.router = router;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  ngOnInit() {  }


  onSignup() {
    const signupUser: User = new User(this.username, this.password, this.firstName, this.lastName, this.accountType, this.telephone, this.email, this.address);
    this.databaseService.users.push(signupUser);
    this.successfulSignup = true;
    console.log("Sign-up User:");
    console.log(signupUser);
    setTimeout(() => { this.navCtrl.pop(); }, 3000);
  }

  backToWelcomePage() {
    this.navCtrl.pop();
    console.log("Back Button Clicked");
  }
}
