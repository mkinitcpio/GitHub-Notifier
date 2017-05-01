import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GitHubNotifierExplorerComponent } from './github-notifier-explorer/github-notifier-explorer.component';
import { SearchComponent } from "./search/search.component";

export const AppRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'github-notifier-explorer',
    component: GitHubNotifierExplorerComponent
  },{
    path:'search',
    component: SearchComponent
  }
];