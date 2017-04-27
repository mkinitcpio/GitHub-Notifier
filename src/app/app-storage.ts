import { Injectable } from '@angular/core';
import { Repository } from './models/repository';
import { GitGubNotifier } from './models/github-notifier';

@Injectable()
export class AppStorage {

    constructor() { }

    public getUserRepositories(username: string): Repository[] {
        let repositoriesData = JSON.parse(localStorage.getItem(username));
        let userRepositories: Repository[] = [];

        if (repositoriesData) {
            userRepositories = repositoriesData.map((repoData: any) => {
                return Repository.parse(repoData);
            });
        } else {
            localStorage.setItem(username, JSON.stringify([]));
        }

        return userRepositories;
    }

    public saveUserRepositories(username: string, repositories: Repository[]): void {
        let repositoriesData = repositories.map((repository: Repository) => Repository.stringify(repository));
        localStorage.setItem(username, JSON.stringify(repositoriesData));
    }
}