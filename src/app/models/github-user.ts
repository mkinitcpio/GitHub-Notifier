export class GitHubUser {

    private _name: string;
    private _avatarUrl: string;
    private _email: string;
    private _accountUrl: string;


    constructor(name: string, avatarUrl: string, email: string, accountUrl: string){
        this._name = name;
        this._accountUrl = accountUrl;
        this._avatarUrl = avatarUrl;
        this._email = email;
    }
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

    public static parse(userData: any): GitHubUser {
        let user = new GitHubUser(userData.name,userData.avatarUrl,userData.email,userData.accountUrl);

        return user;
    }

    public static stringify(user: GitHubUser): any {
        return {
            name: user.name,
            avatarUrl: user.avatarUrl,
            accountUrl: user.accountUrl,
            email: user.email
        }
    }
}