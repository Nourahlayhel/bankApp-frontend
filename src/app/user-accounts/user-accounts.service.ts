import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/enviroment';
import { AppService } from '../app.service';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { AccountDto } from './userAccount';

@Injectable({
  providedIn: 'root',
})
export class UserAccountsService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private appService: AppService) {}

  userAccountsSource = new BehaviorSubject<AccountDto[]>([]);
  userAccounts$ = this.userAccountsSource.asObservable();

  get userAccounts() {
    return this.userAccountsSource.value;
  }

  set userAccounts(accounts: AccountDto[]) {
    this.userAccountsSource.next(accounts);
  }

  getUserAccounts() {
    let userId = this.appService.loggedInUser.userId;
    return this.httpClient
      .get<AccountDto[]>(this.baseUrl + '/account/' + userId)
      .pipe(
        take(1),
        tap((res: AccountDto[]) => {
          this.userAccounts = res.map((acc) => {
            acc.currency = this.appService.currencySource.find(
              (c: any) => c.id == acc.currencyId
            ).code;
            return acc;
          });
        })
      );
  }

  createAccount(initialCredit: number, currencyId: number) {
    let createAccountDto = {
      customerId: this.appService.loggedInUser.userId,
      initialCredit,
      currencyId,
    };

    this.httpClient
      .post(this.baseUrl + '/account', createAccountDto)
      .pipe(take(1))
      .subscribe((acc: any) => {
        acc.currency = this.appService.currencySource.find(
          (c: any) => c.id == acc.currencyId
        ).code;
        let accounts = this.userAccounts;
        accounts = [acc, ...accounts];
        this.userAccounts = accounts;
      });
  }
}
