import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app.route';

import { GitHubApi } from './github-api';
import { GitGubNotifier } from './models/github-notifier';
import { AppStorage } from './app-storage';
import { SearchComponent } from "./search/search.component";
import { NotifierService } from "./notifier.service";
import { RepositoryCommitsChecker } from "./models/repository-commits-checker";

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule
    ],
    providers: [
        GitHubApi,
        GitGubNotifier,
        AppStorage,
        NotifierService,
        RepositoryCommitsChecker
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }