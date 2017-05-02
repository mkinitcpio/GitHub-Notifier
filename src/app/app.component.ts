import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Repository } from './models/repository';
import { GitGubNotifier } from './models/github-notifier';
import { Application } from "./models/applictation";

@Component({
    selector: 'app',
    templateUrl: 'app.html',
    styles: [
        require('./app.css').toString(),
        require('./css-reset.css').toString()
    ]
})

export class AppComponent implements OnInit {

    private _isSearchComponentEnable: boolean = false;

    constructor(private _router: Router, private _application: Application) { }

    ngOnInit() { }

    public get isLogIn(): boolean {
        return this._application.gitHubNotifier.isUserLoggedIn;
    }

    public logout(): void {
        this._application.logout();
        this._router.navigate(['']);
    }

    public get isSearchComponentEnable(): boolean {
        return this._isSearchComponentEnable;
    }

    public searchRepo(): void {
        this._router.navigate(['search']);
        this._isSearchComponentEnable = true;
    }

    public navigateToMainComponent(): void {
        this._isSearchComponentEnable = false;
        this._router.navigate(['github-notifier-explorer']);
    }
}