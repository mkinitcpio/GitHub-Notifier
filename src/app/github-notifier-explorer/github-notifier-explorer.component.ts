import { Component } from '@angular/core';

import { GitGubNotifier } from '../models/github-notifier';
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
    
    constructor() { }

    public onRepositoryClick(selectedRepositoryFullname: string): void {
        this._selectedRepositoryFullName = selectedRepositoryFullname;
    }

    public get selectedRepositoryFullname(): string{
        return this._selectedRepositoryFullName;
    }
}