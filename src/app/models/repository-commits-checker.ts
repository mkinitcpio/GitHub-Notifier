import { Repository } from './repository';
import { Observable, Subscription } from 'rxjs';
import { GitHubApi } from "../github-api";
import { Commit } from "./commit";

export class RepositoryCommitsChecker {

    private _repository: Repository;
    private _lastWatchedCommitSha: string;
    private _repositoriesSubscriptions: Subscription[] = [];

    constructor(repository: Repository, private _gitHubApi: GitHubApi) {
        this._repository = repository;
        this._lastWatchedCommitSha = repository.lastCommitSha;
    }

    public isRepositoryHasNewCommit(): Observable<boolean> {
        return Observable.interval(20 * 1000).flatMap(() => {
            return this._gitHubApi.getRepositoryCommits(this._repository.fullname).map((c) => {
                let lastCommit = c[0];

                let isRepositoryHasNewCommit: boolean = lastCommit.sha === this._lastWatchedCommitSha ? false : true;

                if (isRepositoryHasNewCommit) {
                    this._lastWatchedCommitSha = lastCommit.sha;
                }

                return isRepositoryHasNewCommit;
            });
        });
    }

    public get repositoryName(): string {
        return this._repository.name;
    }
} 