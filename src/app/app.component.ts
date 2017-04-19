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


    public logout(): void {
        this._router.navigate(['']);
    }

    public addRepo(): void {
        this._gitHubNotifier.addRepository(new Repository());
    }
}