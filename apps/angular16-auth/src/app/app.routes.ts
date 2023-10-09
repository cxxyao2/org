import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent, RegisterComponent } from './account';
import { authGuard } from './helpers';
import { PageNotFoundComponent } from './components/page-not-found.component';



export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes'),
    canActivate: [authGuard],
  },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
