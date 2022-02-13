import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goToSigninPage() {
    this.navCtrl.push("SigninPage");
    console.log("Signin Button Clicked");
  }

  goToSignupPage() {
    this.navCtrl.push("SignupPage");
    console.log("Signin Button Clicked");
  }
}
