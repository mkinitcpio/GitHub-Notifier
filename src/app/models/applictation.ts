import { GitGubNotifier } from "./github-notifier";
import { Injectable } from "@angular/core";

@Injectable()
export class Application {

    private _username: string = null;

    constructor(private _githubNotifier: GitGubNotifier) { }

    public logIn(username: string): void {

        if (username === null && username === undefined) {
            throw new Error("name has null or undefined value.");
        }
        if (username === "") {
            throw new Error("name has empty string.");
        }

        this._username = username;
        this._githubNotifier.logIn(username);
    }

    public logout(): void {
        this._username = null;
        this._githubNotifier.logOut();
    }

    public get gitHubNotifier(): GitGubNotifier {
        return this._githubNotifier;
    }
}