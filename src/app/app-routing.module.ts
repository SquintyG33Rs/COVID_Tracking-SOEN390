import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'welcome-page',
    loadChildren: () => import('./pages/welcome-page/welcome-page.module').then( m => m.WelcomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome-page',
    pathMatch: 'full'
  },
  {
    path: 'signin-page',
    loadChildren: () => import('./pages/signin-page/signin-page.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup-page',
    loadChildren: () => import('./pages/signup-page/signup-page.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./pages/home-page/home-page.module').then( m => m.HomePageModule)
  },
  {
    path: 'status-update',
    loadChildren: () => import('./pages/status-update/status-update.module').then( m => m.StatusUpdatePageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./pages/appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'manage-profiles',
    loadChildren: () => import('./pages/manage-profiles/manageprofiles.module').then( m => m.ManageProfilesPageModule)
  },
  {
    path: 'monitoring-status',
    loadChildren: () => import('./pages/monitoring-status/monitoring-status.module').then( m => m.MonitoringStatusPageModule)
  },
  {
    path: 'assignment',
    loadChildren: () => import('./pages/assignment/assignment.module').then( m => m.AssignmentPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)

  },
  {
    path: 'patients',
    loadChildren: () => import('./pages/patients/patients.module').then( m => m.PatientsPageModule)
  },  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
