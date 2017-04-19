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
        if (appUsersData) {
            let user = appUsersData.find((r: any) => r.name === name);
            if (user) {
                let u = ApplicationUser.parse(user);
                this.appUser.name = u.name;
                this.appUser.repositories = u.repositories;
            } else {
                this.appUser.name = name;
                this.appUser.repositories = [];
            }
        }
        else {
            this.appUser.name = name;
            this.appUser.repositories = [];
        }
        return this.appUser;
    }
}
