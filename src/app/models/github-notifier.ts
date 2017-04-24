import { Injectable } from '@angular/core';

import { Commit } from './commit';
import { Repository } from './repository';
import { ApplicationUser } from './applicationUser';

import { GitHubApi } from '../github-api';
import { AppStorage } from '../app-storage';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GitGubNotifier {

    private _applicationUser: ApplicationUser;
    private _repositories: Array<Repository>;
    private _applicationUserRepositorySubject = new BehaviorSubject<ApplicationUser>(this._applicationUser);

    constructor(
        private _gitGubApi: GitHubApi,
        private _appStorage: AppStorage
    ) { }

    public logIn(userName: string): void {
        this._applicationUser = this._appStorage.getApplicationUser(userName);
    }

    addRepository(newRepository: Repository): void {
        this._applicationUser.addRepository(newRepository);
        this._applicationUserRepositorySubject.next(this._applicationUser);
    }

    removeRepository(repoFullName: string): void {
        this._applicationUser.removeRepository(repoFullName);
        this._applicationUserRepositorySubject.next(this._applicationUser);
    }

    public getApplicationUserSubject(): Observable<ApplicationUser> {
        return this._applicationUserRepositorySubject;
    }

    public get isUserLoggedIn(): boolean{
        return !!this._applicationUser;
    }
}