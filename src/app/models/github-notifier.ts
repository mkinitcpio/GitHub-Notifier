import { Injectable } from '@angular/core';

import { Commit } from './commit';
import { Repository } from './repository';

import { GitHubApi } from '../github-api';
import { AppStorage } from '../app-storage';

import { Observable, BehaviorSubject } from 'rxjs';
import { RepositoryCommitChecker } from "./repository-commit-checker";

@Injectable()
export class GitGubNotifier {

    private _username: string = null;
    private _repositories: Array<Repository> = [];
    private _repositoriesSubject: BehaviorSubject<Repository[]>;
    private _isUserLoggedIn: boolean = false;

    constructor(
        private _gitGubApi: GitHubApi,
        private _appStorage: AppStorage
    ) { }

    public logIn(userName: string): void {

        if (userName === null && userName === undefined) {
            throw new Error("name has null or undefined value.");
        }
        if (userName === "") {
            throw new Error("name has empty string.");
        }

        this._username = userName;
        this._repositories = this._appStorage.getUserRepositories(userName);
        this._repositoriesSubject = new BehaviorSubject<Repository[]>(this._repositories);
        this._isUserLoggedIn = true;
    }

    public logOut(): void {
        this._username = null;
        this._repositories = null;
        this._isUserLoggedIn = false;
    }

    public addRepository(newRepository: Repository): void {
        this._repositories.push(newRepository);
        this._appStorage.saveUserRepositories(this._username, this._repositories);
        this._repositoriesSubject.next(this._repositories);
        let r = new RepositoryCommitChecker(newRepository, this._gitGubApi).isRepositoryHasNewCommit().subscribe((v)=>{
            console.log(v);
        });
    }

    public removeRepository(repoFullName: string): void {
        this._repositories = this._repositories.filter((repository: Repository) => repository.fullname !== repoFullName);
        this._appStorage.saveUserRepositories(this._username, this._repositories)
        this._repositoriesSubject.next(this._repositories);
    }

    public searchRepositories(regex: string): Promise<Repository[]> {
        return this._gitGubApi.searchRepos(regex);
    }

    public getRepositoryCommits(repositoryFullname: string): Promise<Commit[]> {
        return this._gitGubApi.getRepositoryCommits(repositoryFullname).toPromise();
    }

    public getRepositoriesSubject(): Observable<Repository[]> {
        return this._repositoriesSubject;
    }

    public get isUserLoggedIn(): boolean {
        return this._isUserLoggedIn;
    }

    public isRepoExistInSubscribedRepos(repositoryFullname: string): boolean {
        return !!this._repositories.find((repository: Repository) => repository.fullname === repositoryFullname);
    }
}