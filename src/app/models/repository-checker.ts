import { Observable, Subject, Subscription } from "rxjs";

import { Repository } from "./repository";
import { GitHubApi } from '../github-api';
import { Http } from '@angular/http';

export class RepositoryChecker {

    private SECONDS = 45;

    private _hasLastCommit: boolean;
    private _isAlreadyNotified: boolean;
    private _repository: Repository;
    private _repositoryCheckerSubscription: Subscription;

    constructor(repository: Repository, private _gitHubApi: GitHubApi) {
        this._hasLastCommit = true;
        this._repository = repository;
        this._isAlreadyNotified = false;
    }

    public get repository(): Repository {
        return this._repository;
    }

    public isRepositoryHasNewCommitObservable(): Observable<boolean> {
        return Observable.interval(this.SECONDS * 1000).startWith(1).flatMap(() => {
            return this._gitHubApi.getRepositoryCommits(this._repository.fullname).map((c) => {
                let lastCommit = c[0];

                let isRepositoryHasNewCommit: boolean;

                if (this._isAlreadyNotified) {
                    isRepositoryHasNewCommit = false;
                } else {
                    isRepositoryHasNewCommit = lastCommit.sha === this._repository.lastCommitSha ? false : true;

                    if (isRepositoryHasNewCommit) {
                        this._hasLastCommit = false;
                        this._isAlreadyNotified = true;
                    } else {
                        this._hasLastCommit = true;
                    }
                }

                return isRepositoryHasNewCommit;
            });
        });
    }

    public get hasLastCommit(): boolean {
        return this._hasLastCommit;
    }

    public set lastCommitSha(commitSha: string) {
        if (commitSha) {
            this.repository.lastCommitSha = commitSha;
            this._hasLastCommit = true;
            this._isAlreadyNotified = false;
        } else {
            throw new Error("commitSha has null or undefined value.");
        }
    }
}