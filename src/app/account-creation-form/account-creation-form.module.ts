import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCreationFormComponent } from './account-creation-form.component';
import { CurrencyDropdownModule } from '../currency-dropdown/currency-dropdown/currency-dropdown.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountCreationFormComponent],
  imports: [CommonModule, CurrencyDropdownModule, FormsModule],
  exports: [AccountCreationFormComponent],
})
export class AccountCreationFormModule {}
