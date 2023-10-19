import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent, RegisterComponent } from './account';
import { authGuard } from './helpers';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { ErrordemoComponent } from './components';
import { AuthForNet6Component } from './components/auth-for-net6/auth-for-net6.component';



export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {path: 'errordemo', component:ErrordemoComponent},
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes'),
    canActivate: [authGuard],
  },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'auth-net6', component: AuthForNet6Component, title: 'Auth for .NET 6' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
