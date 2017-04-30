import { Component, OnInit } from '@angular/core';
import { Repository } from "../models/repository";
import { Application } from "../models/applictation";
import { Commit } from "../models/commit";

@Component({
    selector: 'repositories-explorer',
    templateUrl: 'repositories-explorer.html'
})

export class RepositoriesExplorerComponent implements OnInit {

    public selectedRepositoryCommits: Commit[];
    public appUserSubject: any;
    public repositories: Repository[];

    constructor(private _application: Application) {
        if (!this.appUserSubject) {
            this.appUserSubject = this._application.gitHubNotifier.getRepositoriesSubject().subscribe((repositories: Repository[]) => {
                this.repositories = repositories;
            });
        }
    }

    ngOnInit() { }

    public isRepositoryHasLastCommit(repo: Repository): boolean {
        return this._application.gitHubNotifier.isRepositoryHasLastCommit(repo.fullname);
    }


    public showRepositoryCommits(repository: Repository): void {
        this._application.gitHubNotifier.getRepositoryCommits(repository.fullname).then(commits => {
            this.selectedRepositoryCommits = commits;
            this._application.gitHubNotifier.setLastCommitShaRepository(repository.fullname, commits[0].sha);
        });
    }
}