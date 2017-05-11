import { Component } from '@angular/core';

import { GitHubNotifier } from '../models/github-notifier';
import { Repository } from '../models/repository';
import { Router } from '@angular/router';
import { Commit } from "../models/commit";
import { Application } from "../models/applictation";

@Component({
    selector: 'github-notifier-explorer',
    templateUrl: './github-notifier-explorer.html',
    styles: [
        require('./github-notifier-explorer.css').toString()
    ]
})
export class GitHubNotifierExplorerComponent {

     private _selectedRepositoryFullName: string = null;

    constructor(private _router: Router, private _githubNotifier: GitHubNotifier) { }

     public onRepositoryClick(selectedRepositoryFullname: string): void {
        this._selectedRepositoryFullName = selectedRepositoryFullname;
    }

    public get selectedRepositoryFullname(): string{
        return this._selectedRepositoryFullName;
    }

    public navigateToSearchedRepositoryComponent(): void {
        this._router.navigate(['search']);
    }

    public logOut(){
        this._githubNotifier.logOut();
        this._router.navigate(['']);
    }
}