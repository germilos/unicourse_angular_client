export class SignUpDto {


  constructor(private _name: string,
              private _username: string,
              private _email: string,
              private _password: string,
              private _role: string[]) {
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

  public get role(): string[] {
    return this._role;
  }

  public set role(value: string[]) {
    this._role = value;
  }
}
