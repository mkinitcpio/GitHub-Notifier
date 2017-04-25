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

    constructor(private _http: Http) {

    }

    public searchRepos(reg: string): Promise<Repository[]> {
        return this._http.get(`${this.GITHUB_URL}/search/repositories?q=${reg}`).map((responce: any) => {
            let body: any = JSON.parse(responce._body);
            return body.items;
        }).map(reposData => {
            let searchedRepos: Repository[] = [];
            reposData.map((data: any) => {
                let searchedRepo: Repository = new Repository();
                searchedRepo.name = data.name;
                searchedRepo.fullname = data.full_name;
                searchedRepo.description = data.description;
                searchedRepos.push(searchedRepo);
            });

            return searchedRepos;
        }).toPromise();
    }

    public getRepositoryCommits(repositoryFullname: string): Promise<any> {
        repositoryFullname = "mkinitcpio/ChroperaDial"
        return this._http.get(`${this.GITHUB_URL}/repos/${repositoryFullname}/commits?client_id=${this.ID}&client_secret=${this.SECRET}`).map((response: any) => {
            let commitsData = JSON.parse(response._body);
            return commitsData;
        }).map((commitsData: any) => {
            let repositoryCommits: Commit[] = [];
            commitsData.map((data: any) => {
                let commit = new Commit();
                commit.key = data.sha;
                commit.message = data.commit.message;
                commit.date = new Date(data.commit.author.date);
                commit.url = data.commit.url;
                let author = new GitHubUser();
                author.name = data.commit.author.name;
                author.email = data.commit.author.email;
                author.accountUrl = data.committer.html_url;
                author.avatarUrl = data.committer.avatar_url;
                commit.author = author;
                repositoryCommits.push(commit);
            });
            return repositoryCommits;
        }).toPromise();
    }

}