import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GitHubNotifierExplorerComponent } from './github-notifier-explorer/github-notifier-explorer.component';
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app.route';

import { GitHubApi } from './github-api';
import { GitHubNotifier } from './models/github-notifier';
import { AppStorage } from './app-storage';
import { SearchComponent } from "./search/search.component";
import { NotifierService } from "./notifier.service";
import { Application } from "./models/applictation";
import { RepositoriesExplorerComponent } from "./repositories-explorer/repositories-explorer.component";
import { CommitsExplorerComponent } from "./commits-explorer/commits-explorer.component";
import { RepositoryInfoComponent } from "./repository-info/repository-info.component";
import { BrowserService } from "./browser.service";

@NgModule({
    declarations: [
        AppComponent,
        GitHubNotifierExplorerComponent,
        LoginComponent,
        SearchComponent,
        RepositoriesExplorerComponent,
        CommitsExplorerComponent,
        RepositoryInfoComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        BrowserAnimationsModule
    ],
    providers: [
        GitHubApi,
        GitHubNotifier,
        AppStorage,
        NotifierService,
        Application,
        BrowserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }