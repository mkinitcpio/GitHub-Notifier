import { Injectable } from '@angular/core';
import { Repository } from './models/repository';
import { ApplicationUser } from './models/applicationUser';
import { GitGubNotifier } from './models/github-notifier';

@Injectable()
export class AppStorage {

    private KEY: string = "users";

    constructor() { }

    public getApplicationUser(name: string): ApplicationUser {

        let appUser: ApplicationUser;
        let appUserData;
        let appUsersData = JSON.parse(localStorage.getItem(this.KEY));

        if (appUsersData) {

            appUserData = appUsersData.find((user: any) => user.name === name);
            appUser = appUserData ? ApplicationUser.parse(appUserData) : new ApplicationUser(name);

        } else {
            appUser = new ApplicationUser(name);
        }
        return appUser;
    }

    public saveApplicationUserChanges(user: ApplicationUser): void {

        let appUsersData = JSON.parse(localStorage.getItem(this.KEY));
        let userData = ApplicationUser.stringify(user);

        appUsersData = appUsersData.filter((uData: any) => uData.name !== user.name);
        appUsersData.push(userData);
        localStorage.setItem(this.KEY, JSON.stringify(appUsersData));
    }
}


let a = [{
    "name": "mkinitcpio",
    "repositories": [
        { "name": "mkinitcpio/GitHub", "description": "Test", "lastCommit": 12 },
        { "name": "mkinitcpio/GitHub-Notifier", "description": "Test1", "lastCommit": 123 },
        { "name": "mkinitcpio/Notifier", "description": "Test124", "lastCommit": 12 }]
},
{
    "name": "test", "repositories": [
        { "name": "GitHub", "description": "Test1111", "lastCommit": 12 }, { "name": "GitHub-Notifier", "lastCommit": 123 }, { "name": "Notifier", "lastCommit": 12 }]
}]