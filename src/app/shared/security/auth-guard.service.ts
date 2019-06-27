import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public tokenStorageService: TokenStorageService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
