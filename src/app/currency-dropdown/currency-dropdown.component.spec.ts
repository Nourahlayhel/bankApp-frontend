import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDropdownComponent } from './currency-dropdown.component';

describe('CurrencyDropdownComponent', () => {
  let component: CurrencyDropdownComponent;
  let fixture: ComponentFixture<CurrencyDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyDropdownComponent],
    });
    fixture = TestBed.createComponent(CurrencyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('selectCurrency', () => {
    it('should emit selected currency id', () => {
      spyOn(component.onSelect, 'emit').and.callThrough();
      component.selectCurrency({ target: { value: 1 } });
      expect(component.onSelect.emit).toHaveBeenCalledWith(1);
    });
  });
});
