import { Routes } from '@angular/router';

import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

const USERS_ROUTES: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  { path: 'add', component: AddEditComponent },
  { path: 'edit/:id', component: AddEditComponent },
];

export default USERS_ROUTES;
