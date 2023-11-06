import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AccountDto, TransactionDto } from '../userAccount';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent {
  @Input() account: AccountDto = new AccountDto();

  @Output() onPerformTransaction = new EventEmitter();
  showTransactions: boolean = false;

  constructor(public appService: AppService) {}
  toggleTransactions() {
    this.showTransactions = !this.showTransactions;
  }

  performTransaction($event: TransactionDto) {
    this.account.transactions = [...this.account.transactions, $event];
    let currentBalance = this.account.balance;
    this.account.balance =
      $event.transactionType === 'Withdrawal'
        ? currentBalance - $event.amount
        : currentBalance + $event.amount;
  }
}
