import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Repository } from "../models/repository";
import { Application } from "../models/applictation";
import { Commit } from "../models/commit";

@Component({
    selector: 'repositories-explorer',
    templateUrl: 'repositories-explorer.html',
    styles: [
        require('./repositories-explorer.css').toString()
    ]
})

export class RepositoriesExplorerComponent implements OnInit {

    public selectedRepository: Repository;
    public appUserSubject: any;
    public repositories: Repository[];

    @Output()
    onRepositoryClick = new EventEmitter<Repository>();

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

    public selectRepository(repository: Repository): void {
        this.selectedRepository = repository;
        this.onRepositoryClick.emit(repository);
    }
}