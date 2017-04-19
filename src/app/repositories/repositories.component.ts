import { Component, OnInit, OnDestroy } from '@angular/core';

import { GitGubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';

@Component({
    selector: 'repositories',
    templateUrl: './repositories.html',
    styles: [
        require("./repositories.css").toString()
    ]
})
export class RepositoriesComponent implements OnInit, OnDestroy {

    public repositories: Repository[];
    public appUserSubject: any;

    constructor(private _gitHubNotifier: GitGubNotifier) {
        this.appUserSubject = this._gitHubNotifier.getApplicationUserSubject().subscribe((currentUser: any) => {
            this.repositories = currentUser.repositories;
        });;
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.appUserSubject.unsubscribe();
    }
}