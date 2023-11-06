import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { LoggedInUserDto } from './login/LoggedInUserDto';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = environment.baseUrl + '/user/authenticate';
  constructor(
    private appService: AppService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  login(user: { email: string; password: string }) {
    return this.httpClient.post<LoggedInUserDto>(this.baseUrl, user).pipe(
      tap((userLogin: any) => {
        this.appService.setUserInfo(userLogin);
        this.router.navigateByUrl('/accounts');
      })
    );
  }
}
