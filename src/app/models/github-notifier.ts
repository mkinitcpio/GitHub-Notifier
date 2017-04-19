import { Injectable } from '@angular/core';

import { Commit } from './commit';
import { GitHubUser } from './github-user';
import { Repository } from './repository';
import { ApplicationUser } from './applicationUser';

import { GitHubApi } from '../github-api';
import { AppStorage } from '../app-storage';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GitGubNotifier {

    private _user: GitHubUser;
    private _repositories: Array<Repository>;
    private _applicationUserRepositorySubject = new BehaviorSubject<ApplicationUser>(this._appUser);

    constructor(
        private _gitGubApi: GitHubApi,
        private _appStorage: AppStorage,
        private _appUser: ApplicationUser
    ) { }

    public seacrhApplicationUser(userName: string): void {
        this._appUser = this._appStorage.getApplicationUser(userName);
    }

    addRepository(newRepository: Repository): void {
        this._appUser.addRepository(newRepository);
        this._applicationUserRepositorySubject.next(this._appUser);
    }

    removeRepository(repoFullName: string): void {
        this._appUser.removeRepository(repoFullName);
        this._applicationUserRepositorySubject.next(this._appUser);
    }

    public getApplicationUserSubject(): Observable<ApplicationUser> {
        return this._applicationUserRepositorySubject;
    }
}