export class JwtResponse {

  constructor(private _accessToken: string,
              private _type: string,
              private _username: string,
              private _authorities: string[]) {
  }


  public get accessToken(): string {
    return this._accessToken;
  }

  public set accessToken(value: string) {
    this._accessToken = value;
  }

  public get type(): string {
    return this._type;
  }

  public set type(value: string) {
    this._type = value;
  }

  public get username(): string {
    return this._username;
  }

  public set accessusernameToken(value: string) {
    this._username = value;
  }

  public get authorities(): string[] {
    return this._authorities;
  }

  public set authorities(value: string[]) {
    this._authorities = value;
  }
}
