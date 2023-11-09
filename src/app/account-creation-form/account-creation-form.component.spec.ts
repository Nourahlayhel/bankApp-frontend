import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { CurrencyDropdownModule } from '../currency-dropdown/currency-dropdown/currency-dropdown.module';

import { AccountCreationFormComponent } from './account-creation-form.component';

describe('AccountCreationFormComponent', () => {
  let component: AccountCreationFormComponent;
  let fixture: ComponentFixture<AccountCreationFormComponent>;

  class AppServiceMock {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountCreationFormComponent],
      imports: [CurrencyDropdownModule, FormsModule],
      providers: [{ provide: AppService, useClass: AppServiceMock }],
    });
    fixture = TestBed.createComponent(AccountCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('selectCurrency', () => {
    it('should set value of currencyId', () => {
      component.selectCurrency(2);
      expect(component.currencyId).toEqual(2);
    });
  });

  describe('onAccountCreation', () => {
    it('should emit new account information', () => {
      spyOn(component.onCreateAccount, 'emit').and.callThrough();
      component.initialCredit = 300;
      component.currencyId = 1;
      component.onAccountCreation();
      expect(component.onCreateAccount.emit).toHaveBeenCalledWith({
        initialCredit: 300,
        currencyId: 1,
      });
    });
  });
});
