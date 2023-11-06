import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.scss']
})
export class CurrencyDropdownComponent {
@Input () currencySource:any[]=[]
@Output() onSelect = new EventEmitter();

selectCurrency($event:any){
  this.onSelect.emit($event.target.value)
}

}
