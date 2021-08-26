import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuardGuard } from './login-guard.guard';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'events', component: EventsComponent, canActivate: [LoginGuardGuard]},
  { path: 'my-profile', component: MyProfileComponent, canActivate: [LoginGuardGuard]},
  { path: '**', redirectTo:  '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
