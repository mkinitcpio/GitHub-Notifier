import { Component, OnInit, Input } from '@angular/core';
import { Repository } from "../models/repository";
import { GitHubNotifier } from "../models/github-notifier";
import { BrowserService } from "../browser.service";

@Component({
    selector: 'repository-info',
    templateUrl: 'repository-info.html',
    styles: [
        require('./repository-info.css').toString()
    ]
})

export class RepositoryInfoComponent implements OnInit {

    private _selectedRepository: Repository = null;

    @Input()
    public set selectedRepository(selectedRepository: Repository) {
        this._selectedRepository = selectedRepository;
    }

    public get selectedRepository(): Repository {
        return this._selectedRepository;
    }

    constructor(private _gitHubNotifier: GitHubNotifier, private _browserService: BrowserService) { }

    ngOnInit() { }

    public backToRepositoriesExplorer(){
        this._selectedRepository = null;
    }

    public removeRepository(): void{
        this._gitHubNotifier.removeRepository(this._selectedRepository.fullname);
        this._selectedRepository = null;
    }

    public openInBrowser(){
        this._browserService.openInBrowser(this._selectedRepository.repositoryUrl);
    }
}