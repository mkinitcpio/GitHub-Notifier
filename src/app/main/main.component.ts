import { Component } from '@angular/core';

import { GitGubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';
import { Router } from '@angular/router';
import { Commit } from "../models/commit";
import { Application } from "../models/applictation";

@Component({
    selector: 'main',
    templateUrl: './main.html',
    styles: [
        require('./main.css').toString()
    ]
})
export class MainComponent {

    public repositories: Repository[];
    public selectedRepositoryCommits: Commit[];
    public appUserSubject: any;

    constructor(private _router: Router, private _application: Application) {
        if (!this.appUserSubject) {
            this.appUserSubject = this._application.gitHubNotifier.getRepositoriesSubject().subscribe((repositories: Repository[]) => {
                this.repositories = repositories;
            });
        }
    }

    public showRepositoryCommits(repository: Repository): void {
        this._application.gitHubNotifier.getRepositoryCommits(repository.fullname).then(commits => {
            this.selectedRepositoryCommits = commits;
            this._application.gitHubNotifier.setLastCommitShaRepository(repository.fullname, commits[0].sha);
        });
    }

    public isRepositoryHasLastCommit(repo: Repository): boolean {
        return this._application.gitHubNotifier.isRepositoryHasLastCommit(repo.fullname);
    }
}