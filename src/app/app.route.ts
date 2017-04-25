import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from "./search/search.component";

export const AppRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent
  },{
    path:'search',
    component: SearchComponent
  }
];