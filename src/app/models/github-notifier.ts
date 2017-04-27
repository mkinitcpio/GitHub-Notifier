import { Injectable } from '@angular/core';

import { Commit } from './commit';
import { Repository } from './repository';

import { GitHubApi } from '../github-api';
import { AppStorage } from '../app-storage';

import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { RepositoryCommitsChecker } from "./repository-commits-checker";
import { NotifierService } from "../notifier.service";

@Injectable()
export class GitGubNotifier {

    private _username: string = null;
    private _repositories: Array<Repository> = [];
    private _repositoriesSubject: BehaviorSubject<Repository[]>;
    private _isUserLoggedIn: boolean = false;
    private _repositoriesSubscriptions: Subscription[] = [];

    constructor(
        private _gitGubApi: GitHubApi,
        private _appStorage: AppStorage,
        private _notifierService: NotifierService
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
        this.subscribeOnRepositoryChanges();
    }

    private subscribeOnRepositoryChanges(): void {
        for (let repository of this._repositories) {
            let repositoryCommitsChecker = new RepositoryCommitsChecker(repository, this._gitGubApi);
            let repSubscription = repositoryCommitsChecker.isRepositoryHasNewCommit().subscribe((isRepositoryHasNewCommit: boolean) => {

                if (isRepositoryHasNewCommit) {
                    this._notifierService.notify(repositoryCommitsChecker.repositoryName);
                }
            });

            this._repositoriesSubscriptions.push(repSubscription);
        }
    }

    private unsubscribeOnRepositoryChanges(): void {
        for (let repSubscription of this._repositoriesSubscriptions) {
            repSubscription.unsubscribe();
        }
    }

    public logOut(): void {
        this._username = null;
        this._repositories = null;
        this._isUserLoggedIn = false;
        this.unsubscribeOnRepositoryChanges();
    }

    public addRepository(newRepository: Repository): void {
        this._repositories.push(newRepository);
        this._appStorage.saveUserRepositories(this._username, this._repositories);
        this._repositoriesSubject.next(this._repositories);
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