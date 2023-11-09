import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountComponent } from './user-account.component';

describe('UserAccountComponent', () => {
  let component: UserAccountComponent;
  let fixture: ComponentFixture<UserAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountComponent],
    });
    fixture = TestBed.createComponent(UserAccountComponent);
    component = fixture.componentInstance;
    component.account = {
      accountId: 1,
      balance: 500,
      currencyId: 1,
      creationDate: new Date(),
      transactions: [],
      user: null,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('selectAccount', () => {
    it('should emit selected account id', () => {
      spyOn(component.onSelectEmitter, 'emit').and.callThrough();
      component.selectAccount();
      expect(component.onSelectEmitter.emit).toHaveBeenCalledWith(1);
    });
  });
  describe('showCreationForm', () => {
    it('should emit selected account id', () => {
      spyOn(component.onShowCreationFormClickEmitter, 'emit').and.callThrough();
      component.showCreationForm();
      expect(component.onShowCreationFormClickEmitter.emit).toHaveBeenCalled();
    });
  });
});
