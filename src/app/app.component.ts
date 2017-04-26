import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Repository } from './models/repository';
import { GitGubNotifier } from './models/github-notifier';

@Component({
    selector: 'app',
    templateUrl: 'app.html',
    styles: [
        require('./app.css').toString()
    ]
})

export class AppComponent implements OnInit {

    constructor(private _router: Router, private _gitHubNotifier: GitGubNotifier) { }

    ngOnInit() { }


    public get isLogIn(): boolean {
        return this._gitHubNotifier.isUserLoggedIn;
    }

    public logout(): void {
        this._gitHubNotifier.logOut();
        this._router.navigate(['']);
    }

    public searchRepo(): void {
        this._router.navigate(['search']);
    }

    addRepo(): void {
        this._gitHubNotifier.addRepository(Repository.parse({
            name: 'ChroperaDial',
            fullname: "mkinitcpio/ChroperaDial",
            commits: [],
            description: "Test",
            owner: null,
            isExistUnwatchedCommit: false,
            lastCommitKey: "1"
        }));
    }
}