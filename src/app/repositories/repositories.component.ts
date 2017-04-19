import { Component, OnInit } from '@angular/core';

import { GitGubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';

@Component({
    selector: 'repositories',
    templateUrl: './repositories.html'
})
export class RepositoriesComponent implements OnInit {

    public repositories: Repository[];
    
    constructor(private _gitHubNotifier: GitGubNotifier) { }

    ngOnInit() {
        this._gitHubNotifier.getApplicationUserSubject().subscribe(currentUser => {
            this.repositories = currentUser.repositories;
        });
    }

}