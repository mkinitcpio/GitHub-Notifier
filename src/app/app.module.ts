import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app.route';

import { GitHubApi } from './github-api';
import { GitGubNotifier } from './models/github-notifier';
import { AppStorage } from './app-storage';
import { ApplicationUser } from './models/applicationUser';
import { RepositoriesComponent } from './repositories/repositories.component';
import { CommitsComponent } from './commits/commits.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        RepositoriesComponent,
        CommitsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [
        GitHubApi,
        GitGubNotifier,
        AppStorage,
        ApplicationUser
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }