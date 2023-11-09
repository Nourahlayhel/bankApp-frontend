import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionDto } from '../user-accounts/userAccount';
import { TransactionsService } from './transactions.service';

import { TransationsComponent } from './transations.component';

describe('TransationsComponent', () => {
  let component: TransationsComponent;
  let fixture: ComponentFixture<TransationsComponent>;
  let service: TransactionsService;

  class TransactionsServiceMock {
    addTransaction(transactionDto: TransactionDto) {}
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransationsComponent],
      providers: [
        { provide: TransactionsService, useClass: TransactionsServiceMock },
      ],
    });
    fixture = TestBed.createComponent(TransationsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TransactionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('toggleForm', () => {
    it('should show form if its hidden and vice versa', () => {
      component.showTransactionForm = false;
      component.toggleForm();
      expect(component.showTransactionForm).toBeTrue();
    });
  });

  describe('addTransaction', () => {
    it('should add transaction and hide form', () => {
      spyOn(service, 'addTransaction').and.callThrough();
      component.showTransactionForm = true;
      spyOn(component.onSubmitClick, 'emit').and.callThrough();
      let transactionDto: TransactionDto = {
        transactionId: 0,
        transactionTypeId: 1,
        transactionType: 'Deposit',
        transactionDate: new Date('2023-10-10'),
        accountId: 1,
        amount: 20000,
      };
      component.addTransaction(transactionDto);
      expect(service.addTransaction).toHaveBeenCalledWith(transactionDto);
      expect(component.onSubmitClick.emit).toHaveBeenCalledWith(transactionDto);
      expect(component.showTransactionForm).toBeFalse();
    });
  });
});
