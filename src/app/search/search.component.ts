import { Component, OnInit } from '@angular/core';
import { GitHubApi } from "../github-api";
import { GitGubNotifier } from "../models/github-notifier";
import { Repository } from "../models/repository";

@Component({
    selector: 'search',
    templateUrl: 'search.html',
    styles: [
        require('./search.css').toString()
    ]
})

export class SearchComponent implements OnInit {

    private _searchedRepos: Repository[] = [];
    private _selectedRepositoryFullname: string;
    constructor(private _gitHubNotifier: GitGubNotifier) { }

    ngOnInit() { }

    public search(repoName: string): void {
        this._gitHubNotifier.searchRepositories(repoName).then(searchedRepos => {
            this._searchedRepos = searchedRepos;
        });
    }

    public addRepository(r: Repository): void {
        console.log(r);
        this._gitHubNotifier.addRepository(r);
        alert(`Repository ${r.name} added.`);
    }

    public get searchedRepos(): Repository[] {
        return this._searchedRepos;
    }

    public get selectedRepositoryFullname(): string{
        return this._selectedRepositoryFullname;
    }

    public showRepositoryDetails(repositoryFullname: string): void {
        this._selectedRepositoryFullname = repositoryFullname;
    }

    public isSelectedRepository(repositoryFullname: string): boolean{
        return repositoryFullname === this.selectedRepositoryFullname;
    }

    public isRepoExistInSubscribedRepos(repositoryFullname:string): boolean{
        return this._gitHubNotifier.isRepoExistInSubscribedRepos(repositoryFullname);
    }

    public removeRepository(repository: Repository): void{
        this._gitHubNotifier.removeRepository(repository.fullname);
    }
}


let a = [
    {
        "name": "mkinitcpio",
        "repositories": [{
            "name": "GitHub-Notifier",
            "fullname": "mkinitcpio/GitHub-Notifier",
            "description": "Test",
            "lastCommit": 12,
            "commits": [
                {
                    key: "dsfgrdegre",
                    message: "test",
                    url: "testUrl",
                    author: {
                        name: "mkinitcpio",
                        avatarUrl: "url",
                        accountUrl: "accUrl",
                        email: "wot220697"
                    },
                    date: "Tue Apr 25 2017",
                    isWatched: "true"
                }, {
                    key: "dsfgrdegre",
                    message: "test",
                    url: "testUrl",
                    author: {
                        name: "mkinitcpio",
                        avatarUrl: "url",
                        accountUrl: "accUrl",
                        email: "wot220697"
                    },
                    date: "Tue Apr 25 2017",
                    isWatched: "true"
                }, {
                    key: "dsfgrdegre",
                    message: "test",
                    url: "testUrl",
                    author: {
                        name: "mkinitcpio",
                        avatarUrl: "url",
                        accountUrl: "accUrl",
                        email: "wot220697"
                    },
                    date: "Tue Apr 25 2017",
                    isWatched: "true"
                }, {
                    key: "dsfgrdegre",
                    message: "test",
                    url: "testUrl",
                    author: {
                        name: "mkinitcpio",
                        avatarUrl: "url",
                        accountUrl: "accUrl",
                        email: "wot220697"
                    },
                    date: "Tue Apr 25 2017",
                    isWatched: "true"
                }
            ]
        }]
    }]