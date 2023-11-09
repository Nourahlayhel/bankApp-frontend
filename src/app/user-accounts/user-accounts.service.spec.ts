import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/enviroment/enviroment';
import { AppService } from '../app.service';
import { LoggedInUserDto } from '../login/login/LoggedInUserDto';

import { UserAccountsService } from './user-accounts.service';
import { AccountDto } from './userAccount';

describe('UserAccountsService', () => {
  let service: UserAccountsService;
  let appService: AppService;
  const dummyUser: LoggedInUserDto = {
    userId: 1,
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    password: 'test@password',
  };

  const dummyData: AccountDto[] = [
    {
      accountId: 1,
      balance: 1000,
      currency: 'USD',
      currencyId: 2,
      transactions: [],
      user: dummyUser,
      creationDate: new Date('2022-10-10'),
    },
    {
      accountId: 2,
      balance: 2000,
      currency: 'LBP',
      currencyId: 1,
      transactions: [],
      user: dummyUser,
      creationDate: new Date('2022-10-10'),
    },
    {
      accountId: 3,
      balance: 3000,
      currency: 'LBP',
      currencyId: 1,
      transactions: [],
      user: dummyUser,
      creationDate: new Date('2022-10-10'),
    },
  ];
  class AppServiceMock {
    currencySource: any = [
      { id: 1, code: 'LBP', symbol: '£' },
      { id: 2, code: 'USD', symbol: '$' },
    ];
    get loggedInUser() {
      return dummyUser;
    }
  }

  const httpClientSpy = jasmine.createSpyObj('HttpClient', [
    'post',
    'get',
    'put',
    'delete',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AppService, useClass: AppServiceMock },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(UserAccountsService);
    appService = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get userAccounts', () => {
    it('should return user accounts source value', () => {
      service.userAccountsSource.next(dummyData);
      expect(service.userAccounts).toEqual(dummyData);
    });
  });

  describe('set userAccounts', () => {
    it('should set user accounts source value', () => {
      service.userAccounts = dummyData;
      expect(service.userAccounts).toEqual(dummyData);
    });
  });

  describe('getUserAccounts', () => {
    it('should make an api call to retrieve all user accounts', () => {
      let userAccounts = [
        {
          accountId: 1,
          balance: 1000,
          currencyId: 2,
          transactions: [],
          user: dummyUser,
          creationDate: new Date('2022-10-10'),
        },
        {
          accountId: 2,
          balance: 2000,
          currencyId: 1,
          transactions: [],
          user: dummyUser,
          creationDate: new Date('2022-10-10'),
        },
        {
          accountId: 3,
          balance: 3000,
          currencyId: 1,
          transactions: [],
          user: dummyUser,
          creationDate: new Date('2022-10-10'),
        },
      ];
      httpClientSpy.get.and.returnValue(of(userAccounts));
      service.getUserAccounts().subscribe(() => {
        expect(service.userAccounts).toEqual(dummyData);
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          environment.baseUrl + '/account/' + appService.loggedInUser.userId
        );
      });
    });
  });

  describe('createAccount', () => {
    it('should create a new account and add it to the current ones', () => {
      service.userAccounts = dummyData;
      let newAccount: AccountDto = {
        accountId: 4,
        currencyId: 2,
        transactions: [],
        balance: 1000,
        creationDate: new Date('2023-11-11'),
        user: dummyUser,
      };
      httpClientSpy.post.and.returnValue(of(newAccount));
      service.createAccount(1000, 2);
      expect(service.userAccounts).toEqual([
        { ...newAccount, currency: 'USD' },
        ...dummyData,
      ]);
      expect(httpClientSpy.post).toHaveBeenCalledWith(
        environment.baseUrl + '/account',
        {
          customerId: appService.loggedInUser.userId,
          initialCredit: 1000,
          currencyId: 2,
        }
      );
    });
  });
});
