import { GitHubUser } from './github-user';

export class Commit {

    private _sha: string;
    private _message: string;
    private _url: string;

    private _author: GitHubUser;
    private _date: Date;

    constructor(sha: string, message: string, url: string, author: GitHubUser, date: Date) {
        this._sha = sha;
        this._message = message;
        this._date = date;
        this._url = url;
        this._author = author;
    }

    public get sha(): string {
        return this._sha;
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
            sha: commit.sha,
            message: commit.message,
            url: commit.url,
            author: GitHubUser.stringify(commit.author),
            date: commit.date.toISOString()
        }
    }

    public static parse(data: any): Commit {
        let commit = new Commit(data.sha, data.message, data.url, GitHubUser.parse(data.author), new Date(data.date));

        return commit;
    }
}