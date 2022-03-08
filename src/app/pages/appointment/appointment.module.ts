import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppointmentPageRoutingModule } from './appointment-page-routing.module';
import { AppointmentPage } from './appointment.page';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      AppointmentPageRoutingModule,
      ReactiveFormsModule
    ],
    declarations: [AppointmentPage]
  })
  export class AppointmentPageModule {}