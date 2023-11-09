import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionDto } from '../user-accounts/userAccount';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-transations',
  templateUrl: './transations.component.html',
  styleUrls: ['./transations.component.scss'],
})
export class TransationsComponent {
  @Input() transactions: TransactionDto[] = [];
  @Input() transactionTypes: any[] | null = [];
  @Input() balance: number = 0;
  @Input() accountId: number = 0;

  @Output() onSubmitClick = new EventEmitter<TransactionDto>();

  DateFormat = 'MM/dd/yyyy';
  TimeFormat = 'hh:mm:ss a';
  showTransactionForm: boolean = false;

  constructor(private transactionService: TransactionsService) {}

  toggleForm() {
    this.showTransactionForm = !this.showTransactionForm;
  }

  addTransaction(transactionDto: TransactionDto) {
    this.showTransactionForm = false;
    this.transactionService.addTransaction(transactionDto);
    this.onSubmitClick.emit(transactionDto);
  }
}
