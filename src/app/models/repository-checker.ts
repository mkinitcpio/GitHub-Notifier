import { Observable, Subject, Subscription } from "rxjs";

import { Repository } from "./repository";
import { GitHubApi } from '../github-api';

export class RepositoryChecker {

    private _hasLastCommit: boolean;
    private _lastCommitSha: string;
    private _repository: Repository;
    private _repositoryCheckerSubscription: Subscription;

    constructor(repository: Repository, private _gitHubApi: GitHubApi) {
        this._hasLastCommit = true;
        this._repository = repository;
    }

    public get repository(): Repository {
        return this._repository;
    }

    public isRepositoryHasNewCommitObservable(): Observable<boolean> {
        return Observable.interval(20 * 1000).flatMap(() => {
            return this._gitHubApi.getRepositoryCommits(this._repository.fullname).map((c) => {
                let lastCommit = c[0];
                let isRepositoryHasNewCommit: boolean = lastCommit.sha === this._repository.lastCommitSha ? false : true;

                if (isRepositoryHasNewCommit) {
                    this._hasLastCommit = false;
                }
                return isRepositoryHasNewCommit;
            });
        });
    }

    public get hasLastCommit(): boolean {
        return this._hasLastCommit;
    }

    public setLastCommitSha(sha: string): void{
        this._repository.lastCommitSha = sha;
        this._hasLastCommit = true;
    }
}