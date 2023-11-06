import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AppService } from './app.service';
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private appService: AppService, private router: Router) {}
  canLoad() {
    return this.active;
  }

  canActivate() {
    return this.active;
  }

  get active() {
    if (this.appService.isAuthenticated) {
      this.router.navigateByUrl('/accounts');
      return false;
    }

    return true;
  }
}
