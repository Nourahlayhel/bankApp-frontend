import { Component, OnInit } from '@angular/core';
import { environment } from 'src/enviroment/enviroment';
import { AppService } from '../app.service';
import { UserAccountsService } from './user-accounts.service';
import { TransactionDto } from './userAccount';

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

  ngOnInit(): void {
    this.userAccountsService.getUserAccounts();
    this.appService.getTransactionTypes();
  }

  createClick() {
    this.showCreationForm = !this.showCreationForm;
  }

  selectCurrency(id: number) {
    this.currencyId = id;
  }

  onAccountCreation() {
    this.showCreationForm = false;
    this.initialCredit = 0;
    this.userAccountsService.createAccount(this.initialCredit, this.currencyId);
  }
}
