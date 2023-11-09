import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AddTransactionFormComponent } from './add-transaction-form.component';

describe('AddTransactionFormComponent', () => {
  let component: AddTransactionFormComponent;
  let fixture: ComponentFixture<AddTransactionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTransactionFormComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(AddTransactionFormComponent);
    component = fixture.componentInstance;
    component.balance = 1000;
    component.accountId = 1;
    component.transactionTypes = [
      { transactionTypeId: 1, name: 'Deposit' },
      { transactionTypeId: 2, name: 'Withdrawal' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should transctionTypeId if its 0', () => {
      expect(component.transactionTypeId).toEqual(1);
    });
  });

  describe('selectType', () => {
    it('should set transactionTypeId', () => {
      component.selectType({ target: { value: 2 } });
      expect(component.transactionTypeId).toEqual(2);
    });
  });

  describe('submit', () => {
    it('should show message if amount is 0 or negative', fakeAsync(() => {
      component.amount = 0;
      component.submit();
      tick(100);
      expect(component.showEmptyAmountMessage).toBeTrue();
      tick(5000);
      expect(component.showEmptyAmountMessage).toBeFalse();
    }));
  });
  it('should show message if withdrawal is more than balance', fakeAsync(() => {
    component.amount = 2000;
    component.transactionTypeId = 2;
    component.submit();
    tick(100);
    expect(component.showWithdrawalMessage).toBeTrue();
    tick(5000);
    expect(component.showEmptyAmountMessage).toBeFalse();
  }));
  it('should submit add transaction', () => {
    component.amount = 1000;
    component.transactionTypeId = 1;
    spyOn(component.onSubmitClick, 'emit').and.callThrough();
    component.submit();
    expect(component.amount).toEqual(0);
    expect(component.transactionTypeId).toEqual(1);
    expect(component.onSubmitClick.emit).toHaveBeenCalledWith({
      accountId: component.accountId,
      transactionDate: jasmine.any(Date),
      transactionId: 0,
      transactionType: 'Deposit',
      amount: 1000,
      transactionTypeId: 1,
    });
  });
});
