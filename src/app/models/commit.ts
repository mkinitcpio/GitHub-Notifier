import { GitHubUser } from './github-user';

export class Commit {

    private _key: string;
    private _message: string;
    private _url: string;
    private _isWatched: boolean = false;

    private _author: GitHubUser;
    private _date: Date;

    constructor() { }

    public get isWatched(): boolean {
        return this._isWatched;
    }

    public set isWatched(value: boolean) {
        this._isWatched = value;
    }

    public get key(): string {
        return this._key;
    }

    public get message(): string {
        return this._message;
    }

    public get url(): string {
        return this._url;
    }

    public get author(): GitHubUser {
        return this._author;
    }

    public get date(): Date {
        return this._date;
    }

    public static stringify(commit: Commit): any {
        return {
            key: commit.key,
            message: commit.message,
            url: commit.url,
            author: GitHubUser.stringify(commit.author),
            date: commit.date,
            isWatched: commit.isWatched
        }
    }

    public static parse(data: any): Commit {
        let commit = new Commit();

        commit._key = data.key;
        commit._message = data.message;
        commit._url = data.url;
        commit._date = commit._date;
        commit._author = GitHubUser.parse(data.author);
        commit._isWatched = data.isWatched;

        return commit;
    }
}