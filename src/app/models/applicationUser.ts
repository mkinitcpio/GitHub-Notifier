import { Injectable } from '@angular/core';
import { GitHubUser } from './github-user';
import { Repository } from './repository';


@Injectable()
export class ApplicationUser {

    private _name: string = "Test";
    private _repositories: Repository[] = [];

    constructor() { }

    public removeRepository(fullname: string): void {
        this._repositories = this._repositories.filter(repo => repo.fullname !== fullname);
    }

    public get repositories(): Repository[] {
        return this._repositories;
    }

    public set repositories(repositories: Repository[]) {
        this._repositories = repositories;
    }

    public addRepository(newRepository: Repository): void {

        let isRepositoryExist = !!this._repositories.find(repo => repo.fullname === newRepository.fullname);

        if (isRepositoryExist) {
            throw new Error("Repository is already exist in subscribed repositories");
        } else {
            this._repositories.push(newRepository);
        }
    }

    public setUsername(name: string): void {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public static parse(json: any): ApplicationUser {

        let appUser = new ApplicationUser();

        appUser._name = json.name;
        appUser._repositories = json.repositories.map((r: any) => Repository.parse(r));

        return appUser;
    }

    public static stringify(appUser: ApplicationUser): any {
        return {
            name: appUser.name,
            repositories: appUser.repositories.map(r => Repository.stringify(r))
        }
    }
}