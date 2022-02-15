import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
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
    path: 'messages-page',
    loadChildren: () => import('./pages/messages-page/messages-page.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'appointments-page',
    loadChildren: () => import('./pages/appointments-page/appointments-page.module').then( m => m.AppointmentsPageModule)
  },
  {
    path: 'profile-page',
    loadChildren: () => import('./pages/profile-page/profile-page.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'status-update',
    loadChildren: () => import('./pages/status-update/status-update.module').then( m => m.StatusUpdatePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
