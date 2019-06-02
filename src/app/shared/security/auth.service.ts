import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../entity/login-dto';
import { JwtResponse } from '../entity/jwt-response';
import { SignUpDto } from '../entity/sign-up-dto';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: LoginDto): Observable<JwtResponse> {
    console.log("Credentials in auth: ", credentials);
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpDto): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
