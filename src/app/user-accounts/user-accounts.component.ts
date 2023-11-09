import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { UserAccountsService } from './user-accounts.service';
import { AccountDto, TransactionDto } from './userAccount';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss'],
})
export class UserAccountsComponent implements OnInit {
  constructor(
    public userAccountsService: UserAccountsService,
    public appService: AppService
  ) {}

  showCreationForm: boolean = false;
  initialCredit: number = 0;
  currencyId: number = 1;
  selectedAccountId = 0;
  selectedAccount: AccountDto | undefined = new AccountDto();

  ngOnInit(): void {
    this.appService.getTransactionTypes();
    this.userAccountsService.getUserAccounts().subscribe(() => {
      this.selectedAccount = this.userAccountsService.userAccounts[0];
      this.selectedAccountId = this.selectedAccount?.accountId;
    });
  }

  createClick() {
    this.showCreationForm = !this.showCreationForm;
  }

  selectAccount(accountId: number) {
    this.selectedAccountId = accountId;
    this.selectedAccount =
      this.userAccountsService.userAccountsSource.value.find(
        (acc) => acc.accountId === this.selectedAccountId
      );
  }

  onAccountCreation($event: any) {
    this.showCreationForm = false;
    this.userAccountsService.createAccount(
      $event.initialCredit,
      $event.currencyId
    );
  }

  addTransactionToAccount(transactionDto: TransactionDto) {
    let account = this.userAccountsService.userAccounts.find(
      (acc) => acc.accountId == transactionDto.accountId
    );
    if (account) {
      account.transactions = [transactionDto, ...account.transactions];
      account.balance =
        transactionDto.transactionType === 'Deposit'
          ? account.balance + transactionDto.amount
          : account.balance - transactionDto.amount;
    }
  }
}
