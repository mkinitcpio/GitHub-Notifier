import { Repository } from './repository';
import { Observable } from 'rxjs';
import { GitHubApi } from "../github-api";
import { Commit } from "./commit";

export class RepositoryCommitChecker {

    private _repository: Repository;
    private _lastWatchedCommitSha: string;

    constructor(repository: Repository, private _gitHubApi: GitHubApi) {
        this._repository = repository;
        this._lastWatchedCommitSha = repository.lastCommitSha;
    }

    public isRepositoryHasNewCommit(): Observable<boolean> {
        return Observable.interval(20 * 1000).flatMap(() => {
            return this._gitHubApi.getRepositoryCommits(this._repository.fullname).map((c) => {
                let lastCommit = c[0];

                let isRepositoryHasNewCommit: boolean = lastCommit.key === this._lastWatchedCommitSha ? false : true;

                if (isRepositoryHasNewCommit) {
                    this._lastWatchedCommitSha = lastCommit.key;
                }

                return isRepositoryHasNewCommit;
            });
        });
    }
} 