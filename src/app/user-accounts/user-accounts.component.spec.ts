import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AppService } from '../app.service';
import { UserAccountComponent } from './user-account/user-account.component';

import { UserAccountsComponent } from './user-accounts.component';
import { UserAccountsService } from './user-accounts.service';
import { AccountDto } from './userAccount';

describe('UserAccountsComponent', () => {
  let component: UserAccountsComponent;
  let fixture: ComponentFixture<UserAccountsComponent>;

  class UserAccountsServiceMock {
    userAccountsSource = new BehaviorSubject<AccountDto[]>([]);
    userAccounts$ = this.userAccountsSource.asObservable();

    get userAccounts() {
      return this.userAccountsSource.value;
    }

    getUserAccounts() {
      return of(true);
    }
  }
  class AppServiceMock {
    getTransactionTypes() {}
    get loggedInUser() {
      return {
        userId: 1,
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        password: 'test@password',
      };
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountsComponent, UserAccountComponent],
      providers: [
        { provide: AppService, useClass: AppServiceMock },
        { provide: UserAccountsService, useClass: UserAccountsServiceMock },
      ],
    });
    fixture = TestBed.createComponent(UserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
