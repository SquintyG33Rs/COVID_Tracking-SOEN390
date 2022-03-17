import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProfilesPage } from './manageprofiles.page';



const routes: Routes = [
  {
    path: '',
    component: ManageProfilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageProfilesPageRoutingModule {}