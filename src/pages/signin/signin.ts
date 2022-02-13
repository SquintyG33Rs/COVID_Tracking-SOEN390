import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../app/entities/User";
import {DatabaseService} from "../../app/database-services/database.service";




@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  // private router: Router;
  username: string;
  password: string;
  accountType: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseService: DatabaseService) {   //router: Router    ,
    // this.router = router;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    console.log(this.databaseService.findUser('admin.username', 'admin.password', 'ADMIN'));
  }

  ngOnInit() { }

  onSignin() {
    const signInUser: User = this.databaseService.findUser(this.username, this.password, this.accountType)
    if(signInUser) {
      console.log("Sign-in User:");
      console.log(signInUser);
      this.navCtrl.push("HomePage");
    }
  }

  backToWelcomePage() {
    this.navCtrl.pop();
    console.log("Back Button Clicked");
  }
}
