import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Application } from "../models/applictation";
import { Commit } from "../models/commit";

@Component({
    selector: 'commits-explorer',
    templateUrl: 'commits-explorer.html'
})

export class CommitsExplorerComponent implements OnInit, OnChanges {

    private _selectedRepositoryFullname: string;
    private _repositoryCommits: Commit[] = [];
    
    @Input()
    set selectedRepositoryFullname(fullname: string) {
        this._selectedRepositoryFullname = fullname;
    }

    public get repositoryCommits(): Commit[]{
        return this._repositoryCommits;
    }

    constructor(private _application: Application) { }

    ngOnInit() { }

    ngOnChanges() {
        if (this._selectedRepositoryFullname) {
            this._application.gitHubNotifier.getRepositoryCommits(this._selectedRepositoryFullname).then(commits => {
                this._repositoryCommits = commits;
            });
        }
    }
}