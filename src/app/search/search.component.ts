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

    constructor(private _gitHubNotifier: GitGubNotifier) { }

    ngOnInit() { }

    search(repoName: string): void {
        this._gitHubNotifier.searchRepositories(repoName).then(searchedRepos => {
            this._searchedRepos = searchedRepos;
        });
    }

    public get searchedRepos(): Repository[] {
        return this._searchedRepos;
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