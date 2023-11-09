import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { TransactionDto } from '../user-accounts/userAccount';

import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(TransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('AddTransaction', () => {
    it('should make an api call to add new transaction', () => {
      let transactionDto: TransactionDto = {
        transactionId: 0,
        transactionTypeId: 1,
        transactionType: 'Deposit',
        transactionDate: new Date('2023-10-10'),
        accountId: 1,
        amount: 20000,
      };
      httpClientSpy.post.and.returnValue(
        of({ ...transactionDto, transactionId: 1 })
      );
      service.addTransaction(transactionDto);
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        environment.baseUrl + '/transactions',
        transactionDto
      );
    });
  });
});
