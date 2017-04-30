import { Component } from '@angular/core';

import { GitGubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';
import { Router } from '@angular/router';
import { Commit } from "../models/commit";

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

    constructor(private _gitHubNotifier: GitGubNotifier, private _router: Router) {
        if (!this.appUserSubject) {
            this.appUserSubject = this._gitHubNotifier.getRepositoriesSubject().subscribe((repositories: Repository[]) => {
                this.repositories = repositories;
                console.log(this.repositories);
            });
        }
    }

    public showRepositoryCommits(repository: Repository): void {
        this._gitHubNotifier.getRepositoryCommits(repository.fullname).then(commits => {
            this.selectedRepositoryCommits = commits;
        });
    }

    public isRepositoryHasLastCommit(repo: Repository): boolean {
        return this._gitHubNotifier.isRepositoryHasLastCommit(repo.fullname);
    }
}