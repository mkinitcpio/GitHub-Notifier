import { Injectable } from '@angular/core';

import { Commit } from './commit';
import { Repository } from './repository';
import { ApplicationUser } from './applicationUser';

import { GitHubApi } from '../github-api';
import { AppStorage } from '../app-storage';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GitGubNotifier {

    private _applicationUser: ApplicationUser = null;
    private _repositories: Array<Repository>;
    private _applicationRepositorySubject: BehaviorSubject<Repository[]>;
    private _isUserLoggedIn: boolean = false;
    
    constructor(
        private _gitGubApi: GitHubApi,
        private _appStorage: AppStorage,
        private _gitHubApi: GitHubApi
    ) {
     }

    public logIn(userName: string): void {
        this._applicationUser = this._appStorage.getApplicationUser(userName);
        this._applicationRepositorySubject = new BehaviorSubject<Repository[]>(this._applicationUser.repositories);
        this._isUserLoggedIn = true;
    }

    public logOut(): void {
        this._applicationUser = null;
        this._isUserLoggedIn = false;
    }

    public addRepository(newRepository: Repository): void {
        this._applicationUser.addRepository(newRepository);
        this._appStorage.saveApplicationUserChanges(this._applicationUser);
        // this._applicationUserRepositorySubject.next(this._applicationUser);
    }

    public removeRepository(repoFullName: string): void {
        this._applicationUser.removeRepository(repoFullName);
        this._appStorage.saveApplicationUserChanges(this._applicationUser);
        this._applicationRepositorySubject.next(this._applicationUser.repositories);
    }

    public searchRepositories(regex: string): Promise<Repository[]> {
        return this._gitGubApi.searchRepos(regex);
    }

    public getRepositoryCommits(repositoryFullname: string): Promise<Commit[]> {
        return this._gitGubApi.getRepositoryCommits(repositoryFullname);
    }

    public getApplicationUserSubject(): Observable<Repository[]> {
        return this._applicationRepositorySubject;
    }

    public get isUserLoggedIn(): boolean {
        return this._isUserLoggedIn;
    }

    public isRepoExistInSubscribedRepos(repositoryFullname:string): boolean{
        return !!this._applicationUser.repositories.find(repo => repo.fullname === repositoryFullname);
    }
}