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

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }


  async updateEmail(){
    if(this.email!=null){
      this.endpoints.updateUserEmail(this.user.id, this.email).subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        window.location.reload()
      });
    }else{
      this.showEmptyAlert();
    }
  }
  async updatePassword(){
    if(this.password!=null){
      if(this.password === this.passwordConfirm){
        this.endpoints.updateUserPassword(this.user.id, this.password).subscribe((data) => {
          localStorage.setItem('user', JSON.stringify(data))
          window.location.reload()
        });
      }else{
        this.passwordMatch();
      }
    }else{
      this.showEmptyAlert();
    }
  }
  async updateAddress(){
    if(this.address!=null){
      this.endpoints.updateUserAddress(this.user.id, this.address).subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        window.location.reload()
      });
    }else{
      this.showEmptyAlert();
    }
  }
  async updatePhone(){
    if(this.telephone!=null){
      this.endpoints.updateUserPhone(this.user.id, this.telephone).subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        window.location.reload()
      });
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
