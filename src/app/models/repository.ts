import { Commit } from './commit';
import { GitHubUser } from './github-user';

export class Repository {

    private _fullname: string;
    private _description: string;
    private _owner: GitHubUser;
    private _commits: Array<Commit>;
    private _lastCommitKey: string;

    public get isExistUnwatchedCommit(): boolean {

        let isConsistUnwatchedCommit: boolean = false;

        for (let commit of this._commits) {
            if (!commit.isWatched) {
                isConsistUnwatchedCommit = true;
                break;
            }
        }

        return isConsistUnwatchedCommit;
    }

    public get fullname(): string {
        return this._fullname;
    }

    public get description(): string {
        return this._description;
    }

    public get commits(): Array<Commit> {
        return this._commits;
    }

    public get owner(): GitHubUser {
        return this._owner;
    }

    public get lastCommitKey(): string {
        return this._lastCommitKey;
    }

    public set lastCommitKey(key: string) {
        this._lastCommitKey = key;
    }

    public static parse(json: any): Repository {

        let repo = new Repository();

        repo._owner = GitHubUser.parse(json.owner);
        repo._fullname = json.fullname;
        repo._description = json.description;
        // repo._commits = json.commits.map((c: any) => Commit.parse(c));
        return repo;
    }

    public static stringify(repo: Repository): any {
        return {
            fullname: repo.fullname,
            description: repo.description,
            owner: GitHubUser.stringify(repo.owner),
            commits: repo.commits.map(commit => Commit.stringify(commit)),
            lastCommitKey: repo.lastCommitKey
        }
    }
}