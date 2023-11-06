import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransationsComponent } from './transations.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransationsComponent],
  imports: [CommonModule, FormsModule],
  exports: [TransationsComponent],
})
export class TransactionsModule {}
