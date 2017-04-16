import { User } from './user';
import { ICommitData } from './ICommitData';

export class Commit {

    private _key: string;
    private _message: string;
    private _url: string;

    private _author: User;
    private _date: Date;

    constructor() { }

    public get key(): string {
        return this._key;
    }

    public get message(): string {
        return this._message;
    }

    public get url() {
        return this._url;
    }

    public get author(): User {
        return this._author;
    }

    public get date() {
        return this._date;
    }

    public static stringify(commit: Commit): ICommitData {
        return {
            key: commit.key,
            message: commit.message,
            url: commit.url,
            author: User.stringify(commit.author),
            date: commit.date
        }
    }

    public static parse(data: ICommitData): Commit {
        let commit = new Commit();

        commit._key = data.key;
        commit._message = data.message;
        commit._url = data.url;
        commit._date = commit._date;
        commit._author = User.parse(data.author);
        
        return commit;
    }
}