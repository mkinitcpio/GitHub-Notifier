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

     private _selectedRepository: Repository = null;

    constructor(private _router: Router, private _githubNotifier: GitHubNotifier) { }

     public onRepositoryClick(selectedRepository: Repository): void {
        this._selectedRepository = selectedRepository;
    }

    public get selectedRepository(): Repository{
        return this._selectedRepository;
    }

    public navigateToSearchedRepositoryComponent(): void {
        this._router.navigate(['search']);
    }

    public logOut(){
        this._githubNotifier.logOut();
        this._router.navigate(['']);
    }
}