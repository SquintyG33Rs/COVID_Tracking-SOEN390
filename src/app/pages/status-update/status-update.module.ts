import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StatusUpdatePageRoutingModule } from './status-update-routing.module';
import { StatusUpdatePage } from './status-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusUpdatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StatusUpdatePage]
})
export class StatusUpdatePageModule {}
