import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { TransactionDto } from '../user-accounts/userAccount';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  addTransaction(transactionDto: TransactionDto) {
    this.httpClient
      .post(this.baseUrl + '/transactions', transactionDto)
      .pipe(take(1))
      .subscribe();
  }
}
