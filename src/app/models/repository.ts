import { Commit } from './commit';
import { User } from './user';

import { IUserData } from './IUserData';
import { ICommitData } from './ICommitData';
import { IRepositoryData } from './IRepositoryData';

export class Repository {

    private _fullname: string;
    private _description: string;
    private _owner: User;
    private _commits: Array<Commit>;

    public get fullname(): string {
        return this._fullname;
    }

    public get description(): string {
        return this._description;
    }

    public get owner(): User{
        return this._owner;
    }

    public get commits(): Array<Commit>{
        return this._commits;
    }

    public static parse(data: IRepositoryData): Repository {
        let repo = new Repository();
        repo._owner = User.parse(data.owner);
        repo._fullname = data.fullname;
        repo._description = data.description;
        repo._commits = data.commits.map(c => Commit.parse(c));
        return repo;
    }

    public static stringify(repo: Repository): IRepositoryData {
        return {
            fullname: repo.fullname,
            description: repo.description,
            owner: User.stringify(repo.owner),
            commits: repo._commits.map(c => Commit.stringify(c))
        }
    }
}