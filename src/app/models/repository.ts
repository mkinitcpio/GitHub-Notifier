import { Commit } from './commit';
import { GitHubUser } from './github-user';

export class Repository {

    private _name: string;
    private _fullname: string;
    private _description: string;
    private _owner: GitHubUser;
    private _lastCommitSha: string;
    private _repositoryUrl: string;

    constructor(fullname: string, description: string, owner: GitHubUser, lastCommitSha: string, repositoryUrl:string) {

        if (fullname === null && fullname === undefined) {
            throw new Error("fullname has null or undefined value.");
        }
        if (fullname === "") {
            throw new Error("fullname has empty string.");
        }
        this._fullname = fullname;

        this._name = fullname.split('/')[1];

        if (description === null && description === undefined) {
            throw new Error("description has null or undefined value.");
        }
        this._description = description;

        if (owner === null && owner === undefined) {
            throw new Error("owner has null or undefined value.");
        }
        this._owner = owner;

        this._lastCommitSha = lastCommitSha;

        if (repositoryUrl === null && repositoryUrl === undefined) {
            throw new Error("repositoryUrl has null or undefined value.");
        }
        this._repositoryUrl = repositoryUrl;
    }

    public get name(): string {
        return this._name;
    }

    public get fullname(): string {
        return this._fullname;
    }

    public get description(): string {
        return this._description;
    }

    public get owner(): GitHubUser {
        return this._owner;
    }

    public get lastCommitSha(): string {
        return this._lastCommitSha;
    }

    public set lastCommitSha(sha: string) {
        this._lastCommitSha = sha;
    }

    public get repositoryUrl(): string{
        return this._repositoryUrl;
    }

    public static parse(json: any): Repository {
        let repo = new Repository(json.fullname, json.description, GitHubUser.parse(json.owner), json.lastCommitSha, json.repositoryUrl);

        return repo;
    }

    public static stringify(repo: Repository): any {
        return {
            name: repo.name,
            fullname: repo.fullname,
            description: repo.description,
            owner: GitHubUser.stringify(repo.owner),
            lastCommitSha: repo.lastCommitSha,
            repositoryUrl: repo.repositoryUrl
        }
    }
}