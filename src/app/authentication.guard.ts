import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(private appService: AppService) {}

  canActivate() {
    return this.passOrRedirect();
  }

  canLoad() {
    return this.passOrRedirect();
  }

  passOrRedirect() {
    if (this.appService.isAuthenticated) {
      return true;
    } else {
      window.location.replace('/');
      // window.location.reload();
      return false;
    }
  }
}
