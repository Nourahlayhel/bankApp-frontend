import { Component, EventEmitter, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-account-creation-form',
  templateUrl: './account-creation-form.component.html',
  styleUrls: ['./account-creation-form.component.scss'],
})
export class AccountCreationFormComponent {
  initialCredit: number = 0;
  currencyId: number = 1;
  @Output() onCreateAccount = new EventEmitter();

  constructor(public appService: AppService) {}

  selectCurrency(id: number) {
    this.currencyId = id;
  }

  onAccountCreation() {
    this.onCreateAccount.emit({
      initialCredit: this.initialCredit,
      currencyId: this.currencyId,
    });
  }
}
