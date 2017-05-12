import { Component } from '@angular/core';

import { AppStorage } from '../app-storage';
import { GitHubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';

import { Router } from '@angular/router';

import * as electron from 'electron';
import { Application } from "../models/applictation";

@Component({
    selector: 'login',
    templateUrl: 'login.html',
    styles: [
        require('./login.css').toString()
    ]
})

export class LoginComponent {

    constructor(private _router: Router, private _application: Application) { }

    public logIn(name: string) {
        this._application.logIn(name);
        this._router.navigate(['github-notifier-explorer']);
    }
}