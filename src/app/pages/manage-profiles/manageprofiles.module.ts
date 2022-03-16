import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManageProfilesPageRoutingModule } from './manageprofiles-page-routing.module';
import { ManageProfilesPage } from './manageprofiles.page';


@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ManageProfilesPageRoutingModule,
      ReactiveFormsModule
    ],
    declarations: [ManageProfilesPage]
  })
  export class ManageProfilesPageModule {}