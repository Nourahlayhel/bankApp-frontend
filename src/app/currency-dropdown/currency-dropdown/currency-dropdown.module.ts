import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyDropdownComponent } from '../currency-dropdown.component';



@NgModule({
  declarations: [CurrencyDropdownComponent],
  imports: [
    CommonModule
  ],
  exports :[CurrencyDropdownComponent]
})
export class CurrencyDropdownModule { }
