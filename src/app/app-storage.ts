import { Injectable } from '@angular/core';
import { Repository } from './models/repository';
import { ApplicationUser } from './models/applicationUser';
import { GitGubNotifier } from './models/github-notifier';

@Injectable()
export class AppStorage {

    private KEY: string = "users";

    constructor(private appUser: ApplicationUser) { }

    public getApplicationUser(name: string): ApplicationUser {

        let appUsersData = JSON.parse(localStorage.getItem(this.KEY));
        let user = appUsersData.find((r: any) => r.name === name);
        if (user) {
            let u = ApplicationUser.parse(user);
            this.appUser.name = u.name;
            this.appUser.repositories = u.repositories;
        } else {
            this.appUser.name = name;
        }
        return this.appUser;
    }

    private updateApplicationUserData(appUser: ApplicationUser): void {
        let users = JSON.parse(localStorage.getItem(this.KEY));

        if (users) {
            for (let user of users) {
                if (user.name = appUser.name) {
                    user.repositories = appUser.repositories.map(r => Repository.stringify(r));
                    break;
                }
            }
        } else {
            users = [];
            users.push(ApplicationUser.stringify(appUser));
        }

        localStorage.setItem(this.KEY, JSON.stringify(users));
    }
}
