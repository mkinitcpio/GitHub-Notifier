import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Application } from "../models/applictation";
import { Commit } from "../models/commit";

@Component({
    selector: 'commits-explorer',
    templateUrl: 'commits-explorer.html',
    styles: [
        require('./commits-explorer.css').toString()
    ]
})

export class CommitsExplorerComponent implements OnInit, OnChanges {

    private _selectedRepositoryFullname: string;
    private _repositoryCommits: Commit[] = null;
    public selectedCommitSha: string = "";

    @Input()
    set selectedRepositoryFullname(fullname: string) {
        this._selectedRepositoryFullname = fullname;
    }

    public get repositoryCommits(): Commit[] {
        return this._repositoryCommits;
    }

    constructor(private _application: Application) { }

    ngOnInit() { }

    ngOnChanges() {
        if (this._selectedRepositoryFullname) {
            this._application.gitHubNotifier.getRepositoryCommits(this._selectedRepositoryFullname).then(commits => {
                this._repositoryCommits = commits;
                this._application.gitHubNotifier.setLastCommitShaRepository(this._selectedRepositoryFullname, commits[0].sha);
            }).catch((err: Response) =>{
                if(err.status === 409){
                    this._repositoryCommits = [];
                }else{
                    throw new Error(err.statusText);
                }
            });
        }
    }

    public expandCommit(commitSha: string): void {
        if (this.selectedCommitSha === commitSha) {
            this.selectedCommitSha = "";
        } else {
            this.selectedCommitSha = commitSha;
        }
    }
}