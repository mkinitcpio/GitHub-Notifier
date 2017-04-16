import { IUserData } from './IUserData';

export class User {

    private _name: string;
    private _avatarUrl: string;
    private _email: string;
    private _accountUrl: string;

    public get name(): string {
        return this._name;
    }

    public get avatarUrl(): string {
        return this._avatarUrl;
    }

    public get email(): string {
        return this._email;
    }

    public get accountUrl(): string {
        return this._accountUrl;
    }

    public static parse(userData: IUserData): User {
        let user = new User();

        user._name = userData.name;
        user._avatarUrl = userData.avatarUrl;
        user._email = userData.email;
        user._accountUrl = userData.accountUrl;
        
        return user;
    }

    public static stringify(user: User): IUserData {
        return {
            name: user.name,
            avatarUrl: user.avatarUrl,
            accountUrl: user.accountUrl,
            email: user.email
        }
    }
}