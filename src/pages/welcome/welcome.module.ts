import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {WelcomePage} from "./welcome";
import { IonicModule } from 'ionic-angular';
import {BrowserModule} from "@angular/platform-browser";




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [WelcomePage]
})
export class WelcomePageModule {}
