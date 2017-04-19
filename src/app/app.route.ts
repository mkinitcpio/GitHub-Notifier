import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

export const AppRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'repo', component: MainComponent }
];