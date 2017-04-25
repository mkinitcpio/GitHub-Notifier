import { Component } from '@angular/core';

import { AppStorage } from '../app-storage';
import { GitGubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';

import { Router } from '@angular/router';

import * as electron from 'electron';
@Component({
    selector: 'login',
    templateUrl: 'login.html',
    styles: [
        require('./login.css').toString()
    ]
})

export class LoginComponent {

    constructor(private _router: Router, private _gitHubNotifier: GitGubNotifier) { }

    public logIn(name: string) {
        this._gitHubNotifier.logIn(name);
        this._router.navigate(['main']);
    }
}