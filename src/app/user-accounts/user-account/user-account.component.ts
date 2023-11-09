import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountDto } from '../userAccount';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent {
  @Input() account: AccountDto = new AccountDto();
  @Input() isCreate = false;
  @Input() selectedAccountId: number | null = 0;

  @Output() onSelectEmitter: EventEmitter<number> = new EventEmitter();
  @Output() onShowCreationFormClickEmitter = new EventEmitter();

  constructor() {}

  selectAccount() {
    this.onSelectEmitter.emit(this.account.accountId);
  }

  showCreationForm() {
    this.onShowCreationFormClickEmitter.emit();
  }
}
