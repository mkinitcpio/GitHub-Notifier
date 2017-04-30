import { Injectable } from '@angular/core';

import { Commit } from './commit';
import { Repository } from './repository';

import { GitHubApi } from '../github-api';
import { AppStorage } from '../app-storage';

import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { NotifierService } from "../notifier.service";
import { RepositoryChecker } from "./repository-checker";

@Injectable()
export class GitGubNotifier {

    private _username: string = null;
    private _repositoriesSubject: BehaviorSubject<Repository[]>;

    private _isUserLoggedIn: boolean = false;

    private _repositoryCheckers: RepositoryChecker[] = [];
    private _repositoryCheckerSubscriptions: Map<string, Subscription> = new Map<string, Subscription>();

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
        let repositories = this._appStorage.getUserRepositories(userName);

        this._isUserLoggedIn = true;

        for (let repository of repositories) {
            let repoChecker: RepositoryChecker = new RepositoryChecker(repository, this._gitGubApi);
            this._repositoryCheckers.push(repoChecker);
            this._repositoryCheckerSubscriptions.set(repository.fullname, this.getNewRepositoryCheckerSubscription(repoChecker));
        }

        this._repositoriesSubject = new BehaviorSubject<Repository[]>(this.repositories);
    }

    private getNewRepositoryCheckerSubscription(repoChecker: RepositoryChecker): Subscription {
        return repoChecker.isRepositoryHasNewCommitObservable().subscribe((hasNewCommit: boolean) => {
            if (hasNewCommit) {
                this._notifierService.notify();
            }
        });
    }

    public logOut(): void {
        this._repositoryCheckerSubscriptions.forEach(repoCheckerSubscription => {
            repoCheckerSubscription.unsubscribe();
        })
        this._repositoryCheckerSubscriptions.clear();
        this._repositoryCheckers = [];
        this._username = null;
        this._isUserLoggedIn = false;
    }

    public addRepository(repository: Repository): void {
        let repoChecker: RepositoryChecker = new RepositoryChecker(repository, this._gitGubApi);
        this._gitGubApi.getRepositoryCommits(repository.fullname).toPromise().then(commits => {
            let lastCommit = commits[0];
            repository.lastCommitSha = lastCommit.sha;
            this._repositoryCheckers.push(repoChecker);
            this._repositoryCheckerSubscriptions.set(repository.fullname, this.getNewRepositoryCheckerSubscription(repoChecker));
            this._appStorage.saveUserRepositories(this._username, this.repositories);
            this._repositoriesSubject.next(this.repositories);
        });
    }

    public removeRepository(repoFullName: string): void {
        this._repositoryCheckerSubscriptions.get(repoFullName).unsubscribe();
        this._repositoryCheckerSubscriptions.delete(repoFullName);
        this._appStorage.saveUserRepositories(this._username, this.repositories);
        this._repositoriesSubject.next(this.repositories);
    }

    public setLastCommitShaRepository(repoFullname: string, sha: string) {
        let index: number = this.repositories.findIndex(repo => repo.fullname === repoFullname);
        if (index !== -1) {
            this._repositoryCheckers[index].repository.lastCommitSha = sha;
        }
        this._appStorage.saveUserRepositories(this._username, this.repositories);
        this._repositoriesSubject.next(this.repositories);
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
        return !!this.repositories.find((repository: Repository) => repository.fullname === repositoryFullname);
    }

    private get repositories(): Repository[] {
        return this._repositoryCheckers.map((repositoryChecker: RepositoryChecker) => {
            return repositoryChecker.repository;
        });
    }

    public isRepositoryHasLastCommit(repositoryFullname: string): boolean {
        return this._repositoryCheckers.find((repositoryChecker: RepositoryChecker) => {
            return repositoryChecker.repository.fullname === repositoryFullname;
        }).hasLastCommit;
    }
}