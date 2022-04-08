import { AccountType } from '../../entities/AccountType';
import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/User';
import { Router } from '@angular/router';
import { Endpoints } from '../../app-endpoints';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private router: Router;
  private endpoints: Endpoints;
  private user;
  private alertController;

  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
  telephone: string;


  constructor(endpoints: Endpoints, router: Router, AlertController : AlertController)
  {
    this.endpoints = endpoints;
    this.router = router;
    this.alertController = AlertController;
  }

  ngOnInit() { }


  async updateEmail(){
    if(this.email!=null){
      console.log(this.email);
    }else{
      this.showEmptyAlert();
    }
  }
  async updatePassword(){
    if(this.password!=null){
      if(this.password === this.passwordConfirm){
      console.log(this.password);
      }else{
        this.passwordMatch();
      }
    }else{
      this.showEmptyAlert();
    }
  }
  async updateAddress(){
    if(this.address!=null){
      console.log(this.address);
    }else{
      this.showEmptyAlert();
    }
  }
  async updatePhone(){
    if(this.telephone!=null){
      console.log(this.telephone);
    }else{
      this.showEmptyAlert();
    }
  }

  async showEmptyAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Field to update cannot be left empty',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async passwordMatch() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Passwords do not match',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
