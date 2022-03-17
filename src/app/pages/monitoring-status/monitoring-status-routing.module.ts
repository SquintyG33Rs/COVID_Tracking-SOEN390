import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitoringStatusPage } from './monitoring-status.page';

const routes: Routes = [
  {
    path: '',
    component: MonitoringStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoringStatusPageRoutingModule {}
