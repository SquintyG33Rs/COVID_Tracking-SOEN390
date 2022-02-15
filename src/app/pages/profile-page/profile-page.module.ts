import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePagePageRoutingModule } from './profile-page-routing.module';
import { ProfilePage } from './profile.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePagePageRoutingModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
