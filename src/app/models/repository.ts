import { Commit } from './commit';
import { GitHubUser } from './github-user';

export class Repository {

    private _name: string;
    private _fullname: string;
    private _description: string;
    private _owner: GitHubUser;
    private _lastCommitSha: string = null;

    constructor(fullname: string, description: string, owner: GitHubUser) {

        if (fullname === null && fullname === undefined) {
            throw new Error("fullname has null or undefined value.");
        }
        if (fullname === "") {
            throw new Error("fullname has empty string.");
        }
        this._fullname = fullname;

        this._name = fullname.split('/')[0];

        if (description === null && description === undefined) {
            throw new Error("description has null or undefined value.");
        }
        this._description = description;

        if (owner === null && owner === undefined) {
            throw new Error("owner has null or undefined value.");
        }
        this._owner = owner;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get fullname(): string {
        return this._fullname;
    }

    public set fullname(fullname: string) {
        this._fullname = fullname;
    }

    public get description(): string {
        return this._description;
    }

    public set description(descr: string) {
        this._description = descr;
    }

    public get owner(): GitHubUser {
        return this._owner;
    }

    public set owner(owner: GitHubUser) {
        this._owner = owner;
    }

    public get lastCommitSha(): string {
        return this._lastCommitSha;
    }

    public set lastCommitSha(sha: string) {
        this._lastCommitSha = sha;
    }

    public static parse(json: any): Repository {
        let repo = new Repository(json.fullname, json.description, GitHubUser.parse(json.owner));

        return repo;
    }

    public static stringify(repo: Repository): any {
        return {
            name: repo.name,
            fullname: repo.fullname,
            description: repo.description,
            owner: GitHubUser.stringify(repo.owner),
            lastCommitKey: repo.lastCommitSha
        }
    }
}