import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { LoggedInUserDto } from './login/login/LoggedInUserDto';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  currencySource: any = [
    { id: 1, code: 'LBP', symbol: '£' },
    { id: 2, code: 'USD', symbol: '$' },
  ];

  transactionTypesSource = new BehaviorSubject<any[]>([]);
  transactionTypes$ = this.transactionTypesSource.asObservable();

  get loggedInUser() {
    var user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : user;
  }

  get isAuthenticated() {
    return this.loggedInUser !== null;
  }

  setUserInfo(user: LoggedInUserDto) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getTransactionTypes() {
    this.httpClient
      .get(this.baseUrl + '/transactions/types')
      .pipe(take(1))
      .subscribe((res: any) => {
        this.transactionTypesSource.next(res);
      });
  }
}
