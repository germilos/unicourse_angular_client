export class SignUpDto {

    role: string[];

    constructor(private _name: string,
                private _username: string,
                private _email: string,
                private _password: string) {
        this.role = ['user'];
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get password(): string {
        return this._password;
    }
    
    public set password(value: string) {
        this._password = value;
    }
}
