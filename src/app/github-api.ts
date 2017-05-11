import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs";
import { Repository } from "./models/repository";
import { Commit } from "./models/commit";
import { GitHubUser } from "./models/github-user";

@Injectable()
export class GitHubApi {

    private ID: string = "7e9e644207941631cfd1";
    private SECRET: string = "b7c47d6df88598e75d5fc101ff43038d3064855c";
    private GITHUB_URL = "https://api.github.com";
    private _client: any;

    constructor(private _http: Http) { }

    public searchRepos(reg: string): Promise<Repository[]> {
        return this._http.get(`${this.GITHUB_URL}/search/repositories?q=${reg}`).map(responce => {
            let body = responce.json();
            return body.items;
        }).map((reposData) => {
            return reposData.map((data: any) => {
                let owner = new GitHubUser(data.owner.login, data.owner.avatar_url, "", data.owner.html_url);
                let searchedRepo: Repository = new Repository(data.full_name, data.description, owner, data.lastCommitSha);

                return searchedRepo;
            });
        }).toPromise();
    }

    public getRepositoryCommits(repositoryFullname: string): Observable<Commit[]> {
        return this._http.get(`${this.GITHUB_URL}/repos/${repositoryFullname}/commits?client_id=${this.ID}&client_secret=${this.SECRET}`).map(response => {
            let commitsData = response.json();
            return commitsData;
        }).map((commitsData: any) => {
            return commitsData.map((data: any) => {
                let author = new GitHubUser(data.commit.author.name, data.commit.author.avatar_url, data.commit.author.email, data.commit.author.html_url);
                let commit = new Commit(data.sha, data.commit.message, data.commit.url, author, new Date(data.commit.author.date));
            
                return commit;
            });
        });
    }
}