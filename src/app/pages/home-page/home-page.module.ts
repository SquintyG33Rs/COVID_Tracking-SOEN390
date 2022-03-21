import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePage } from './home.page';
import {QRCodeModule} from "angular2-qrcode";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    QRCodeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
