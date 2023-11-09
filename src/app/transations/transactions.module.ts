import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransationsComponent } from './transations.component';
import { FormsModule } from '@angular/forms';
import { AddTransactionFormComponent } from './add-transaction-form/add-transaction-form.component';

@NgModule({
  declarations: [TransationsComponent, AddTransactionFormComponent],
  imports: [CommonModule, FormsModule],
  exports: [TransationsComponent],
})
export class TransactionsModule {}
