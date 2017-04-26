import { Injectable } from '@angular/core';
import { GitHubUser } from './github-user';
import { Repository } from './repository';

export class ApplicationUser {

    private _name: string;
    private _repositories: Repository[] = [];

    constructor(name: string) {
        if (name === null && name === undefined) {
            throw new Error("name has null or undefined value.");
        }
        if (name === "") {
            throw new Error("name has empty string");
        }
        this._name = name;
    }

    public get repositories(): Repository[] {
        return this._repositories;
    }


    public get name(): string {
        return this._name;
    }

    public addRepository(newRepository: Repository): void {

        let isRepositoryExist = !!this._repositories.find(repo => repo.name === newRepository.name);

        if (isRepositoryExist) {
            throw new Error("Repository is already exist in subscribed repositories");
        } else {
            this._repositories.push(newRepository);
        }
    }


    public removeRepository(fullname: string): void {
        this._repositories = this._repositories.filter(repo => repo.fullname !== fullname);
    }

    public static parse(json: any): ApplicationUser {
        let appUser: ApplicationUser;

        if (ApplicationUser.isJsonValid(json)) {
            appUser = new ApplicationUser(json.name);
            appUser._repositories = json.repositories.map((r: any) => Repository.parse(r));
        }
        else {
            throw new Error("JSON isn't valid");
        }

        return appUser;
    }

    public static stringify(appUser: ApplicationUser): any {
        return {
            name: appUser.name,
            repositories: appUser.repositories.map(r => Repository.stringify(r))
        }
    }

    private static isJsonValid(json: any): boolean {
        return json.name !== undefined && json.repositories !== undefined;
    }
}