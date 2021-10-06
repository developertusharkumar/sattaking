import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './modules/error/error.component';
import { HomeComponent } from './modules/home/home.component';
import { AdminComponent } from './modules/shared/admin/admin.component';
import { LoginComponent } from './modules/shared/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: AdminComponent
      }
    ]
  },
  {path: '404', component: ErrorComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
