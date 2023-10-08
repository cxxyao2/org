import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent, RegisterComponent } from './account';
import { authGuard } from './helpers';

const userRoutes = ()=>import('./users/users.routes').then((m)=>m.USERS_ROUTES);


export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'users', loadChildren: userRoutes, canActivate: [authGuard] },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
