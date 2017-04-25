export class GitHubUser {

    private _name: string;
    private _avatarUrl: string;
    private _email: string;
    private _accountUrl: string;

    public get name(): string {
        return this._name;
    }

    public set name(name: string){
        this._name = name;
    }

    public get avatarUrl(): string {
        return this._avatarUrl;
    }

    public set avatarUrl(url: string){
        this._avatarUrl = url;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string){
        this._email = email;
    }

    public get accountUrl(): string {
        return this._accountUrl;
    }

    public set accountUrl(accountUrl: string){
        this._accountUrl = accountUrl;
    }

    public static parse(userData: any): GitHubUser {
        let user = new GitHubUser();

        // user._name = userData.name;
        // user._avatarUrl = userData.avatarUrl;
        // user._email = userData.email;
        // user._accountUrl = userData.accountUrl;
        
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