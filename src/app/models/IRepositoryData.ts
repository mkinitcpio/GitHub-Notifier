import { ICommitData } from './ICommitData';
import { IUserData } from './IUserData';

export interface IRepositoryData {
    fullname: string;
    description: string;
    owner: IUserData;
    commits: Array<ICommitData>
}