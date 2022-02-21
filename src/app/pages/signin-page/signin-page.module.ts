import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SigninPagePageRoutingModule } from './signin-page-routing.module';
import { SigninPage } from './signin.page';
import { ShowHidePasswordComponent } from './show-hide-password.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninPagePageRoutingModule,
  ],
  declarations: [SigninPage,
    ShowHidePasswordComponent
  ],
  exports: [
      ShowHidePasswordComponent
  ]
})
export class SigninPageModule {}
