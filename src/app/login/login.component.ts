import { Component } from '@angular/core';

import { AppStorage } from '../app-storage';
import { GitGubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';

import { Router } from '@angular/router';

import * as electron from 'electron';
@Component({
    selector: 'login',
    templateUrl: 'login.html'
})

export class LoginComponent {

    public repos: Array<Repository> = [];
    public username: string = "";
    constructor(private _router: Router, private _gitHubNotifier: GitGubNotifier) {

    }

    public login(name: string) {
        this._gitHubNotifier.seacrhApplicationUser(name);
        this._router.navigate(['repo']);
    }
}