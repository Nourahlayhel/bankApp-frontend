import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionDto } from 'src/app/user-accounts/userAccount';

@Component({
  selector: 'app-add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss'],
})
export class AddTransactionFormComponent {
  @Input() transactionTypes: any[] = [];
  @Input() balance = 0;
  @Input() accountId = 0;

  amount: number = 0;
  transactionTypeId: number = 0;
  showEmptyAmountMessage: boolean = false;
  showWithdrawalMessage: boolean = false;

  @Output() onSubmitClick = new EventEmitter<TransactionDto>();

  ngOnInit() {
    if (this.transactionTypeId === 0)
      this.transactionTypeId = this.transactionTypes[0].transactionTypeId;
  }

  selectType($event: any) {
    this.transactionTypeId = $event.target.value;
  }

  submit() {
    if (this.amount > 0) {
      let withdrawalTransactionType = this.transactionTypes?.find(
        (t) => t.name === 'Withdrawal'
      )?.transactionTypeId;
      if (
        this.transactionTypeId == withdrawalTransactionType &&
        this.amount > this.balance
      ) {
        this.showWithdrawalMessage = true;
        setTimeout(() => {
          this.showWithdrawalMessage = false;
        }, 5000);
      } else {
        let transactionName = this.transactionTypes?.find(
          (t: any) => t.transactionTypeId == this.transactionTypeId
        ).name;
        let transactionDto: TransactionDto = {
          accountId: this.accountId,
          transactionDate: new Date(),
          transactionId: 0,
          transactionType: transactionName,
          amount: this.amount,
          transactionTypeId: this.transactionTypeId,
        };
        this.amount = 0;
        this.transactionTypeId = this.transactionTypes[0].transactionTypeId;
        this.onSubmitClick.emit(transactionDto);
      }
    } else {
      this.showEmptyAmountMessage = true;
      setTimeout(() => {
        this.showEmptyAmountMessage = false;
      }, 5000);
    }
  }
}
