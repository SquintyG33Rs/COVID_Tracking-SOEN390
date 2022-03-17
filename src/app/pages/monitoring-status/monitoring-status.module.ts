import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitoringStatusPageRoutingModule } from './monitoring-status-routing.module';

import { MonitoringStatusPage } from './monitoring-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitoringStatusPageRoutingModule
  ],
  declarations: [MonitoringStatusPage]
})
export class MonitoringStatusPageModule {}
