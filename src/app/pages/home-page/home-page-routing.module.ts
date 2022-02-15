import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';



const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'messages-page',
    loadChildren: () => import('../messages-page/messages-page.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'appointments-page',
    loadChildren: () => import('../appointments-page/appointments-page.module').then( m => m.AppointmentsPageModule)
  },
  {
    path: 'profile-page',
    loadChildren: () => import('../profile-page/profile-page.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
