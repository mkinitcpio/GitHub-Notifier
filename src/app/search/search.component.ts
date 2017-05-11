import { Component, OnInit, Renderer } from '@angular/core';
import { GitHubApi } from "../github-api";
import { GitHubNotifier } from "../models/github-notifier";
import { Repository } from "../models/repository";

import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Router } from "@angular/router";

@Component({
    selector: 'search',
    templateUrl: 'search.html',
    styles: [
        require('./search.css').toString()
    ], animations: [
        trigger('slideInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                animate(75, keyframes([
                    style({ opacity: 0, transform: 'translateY(-25%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
                ]))
            ]),
            transition('* => void', [
                animate(350, keyframes([
                    style({ opacity: 1, offset: 0 }),
                    style({ opacity: 0, offset: 1 })
                ]))
            ])
        ])
    ]
})

export class SearchComponent implements OnInit {

    next: number = 0;
    private _searchedRepos: Repository[] = [];
    public staggeringRepos: any[] = [];
    private _selectedRepositoryFullname: string;

    constructor(private _gitHubNotifier: GitHubNotifier, private _router: Router) { }

    ngOnInit() {
    }

    public search(repoName: string): void {
        this.next = 0;

        this.staggeringRepos = [];
        this._searchedRepos = [];

        this._gitHubNotifier.searchRepositories(repoName).then(searchedRepos => {
            this._searchedRepos = searchedRepos;
            this.doNext();
        });
    }

    public addRepository(r: Repository): void {
        this._gitHubNotifier.addRepository(r);
        alert(`Repository ${r.name} added.`);
    }

    public get searchedRepos(): Repository[] {
        return this._searchedRepos;
    }

    public get selectedRepositoryFullname(): string {
        return this._selectedRepositoryFullname;
    }

    public showRepositoryDetails(repositoryFullname: string): void {
        this._selectedRepositoryFullname = repositoryFullname;
    }

    public isSelectedRepository(repositoryFullname: string): boolean {
        return repositoryFullname === this.selectedRepositoryFullname;
    }

    public isRepoExistInSubscribedRepos(repositoryFullname: string): boolean {
        return this._gitHubNotifier.isRepoExistInSubscribedRepos(repositoryFullname);
    }

    public removeRepository(repository: Repository): void {
        this._gitHubNotifier.removeRepository(repository.fullname);
    }

    public doNext() {
        if (this.next < this._searchedRepos.length) {
            this.staggeringRepos.push(this._searchedRepos[this.next++]);
        }
    }

    public navigateToMainExplorer(): void {
        this._router.navigate(['github-notifier-explorer']);
    }
}