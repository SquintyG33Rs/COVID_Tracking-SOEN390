import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import {HomePage} from "./home";



@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
