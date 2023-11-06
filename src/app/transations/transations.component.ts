import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionDto } from '../user-accounts/userAccount';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-transations',
  templateUrl: './transations.component.html',
  styleUrls: ['./transations.component.scss'],
})
export class TransationsComponent implements OnInit {
  @Input() transactions: TransactionDto[] = [];
  @Input() transactionTypes: any[] | null = [];
  @Input() balance: number = 0;
  @Input() accountId: number = 0;

  @Output() onSubmitClick = new EventEmitter<TransactionDto>();
  showTransactionForm: boolean = false;
  amount: number = 0;
  transactionTypeId: number = 0;

  constructor(private transactionService: TransactionsService) {}
  ngOnInit() {
    if (this.transactionTypeId == 0)
      this.transactionTypeId = this.transactionTypes
        ? this.transactionTypes[0].transactionTypeId
        : 0;
  }

  toggleForm() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  selectType($event: any) {
    this.transactionTypeId = $event.target.value;
  }

  submit() {
    if (this.amount !== 0) {
      let withdrawalTransactionType = this.transactionTypes?.find(
        (t) => t.name === 'Withdrawal'
      )?.id;
      if (
        this.transactionTypeId == withdrawalTransactionType &&
        this.amount > this.balance
      ) {
      } else {
        this.showTransactionForm = false;

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
        this.transactionService.addTransaction(transactionDto);
        this.amount = 0;
        this.onSubmitClick.emit(transactionDto);
      }
    }
  }
}
