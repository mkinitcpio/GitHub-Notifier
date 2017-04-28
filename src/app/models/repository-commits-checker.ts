import { Repository } from './repository';
import { Observable, Subscription, Subject } from 'rxjs';
import { GitHubApi } from "../github-api";
import { Commit } from "./commit";
import { Injectable } from "@angular/core";

@Injectable()
export class RepositoryCommitsChecker {

    private _repositories: Repository[] = [];
    private _repositoriesSubscriptionsByRepositoryName: Map<string, Subscription> = new Map<string, Subscription>();
    private _repositorySubject: Subject<Repository>;

    constructor(private _gitHubApi: GitHubApi) {
        this._repositorySubject = new Subject<Repository>();
    }

    addRepository(repository: Repository): void {
        let repositorySubscription = Observable.interval(20 * 1000).flatMap(() => {
            return this._gitHubApi.getRepositoryCommits(repository.fullname).map((c) => {
                let lastCommit = c[0];
                let repo = this._repositories.find((repo: Repository) => {
                    return repo.fullname === repository.fullname
                });
                let isRepositoryHasNewCommit: boolean = lastCommit.sha === repo.lastCommitSha ? false : true;

                if (isRepositoryHasNewCommit) {
                    this._repositories = this._repositories.filter((r: Repository) => {
                        return r.fullname !== repo.fullname
                    });
                    repo.lastCommitSha = lastCommit.sha;
                    this._repositories.push(repo);
                }
                return isRepositoryHasNewCommit
            });
        }).subscribe((isRepositoryHasNewCommit: boolean) => {
            if (isRepositoryHasNewCommit) {
                this._repositorySubject.next(repository);
            }
        });
        this._repositories.push(repository);
        this._repositoriesSubscriptionsByRepositoryName.set(repository.fullname, repositorySubscription);
    }

    public unsubscribeRepository(repositoryFullname: string): void {
        this._repositoriesSubscriptionsByRepositoryName.get(repositoryFullname).unsubscribe();
        this._repositoriesSubscriptionsByRepositoryName.delete(repositoryFullname);
        this._repositories = this._repositories.filter((repo: Repository) => repo.fullname !== repositoryFullname);
    }

    public getRepositorySubject(): Observable<Repository> {
        return this._repositorySubject;
    }

    public unsubscribeRepositories(): void {
        this._repositoriesSubscriptionsByRepositoryName.forEach((repoSubscription: Subscription) => {
            repoSubscription.unsubscribe();
        });
        this._repositories = [];
    }
} 