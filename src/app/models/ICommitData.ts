import { IUserData } from './IUserData';

export interface ICommitData {
    key: string,
    message: string,
    url: string,
    author: IUserData,
    date: Date
}