import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { LoginService } from '../login.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  class LoginServiceMock {
    login(_user: { email: string; password: string }) {
      return of(true);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: LoginService, useClass: LoginServiceMock }],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginService.login when form is valid', () => {
    spyOn(loginService, 'login').and.returnValue(of(true));
    component.loginForm.setValue({
      email: 'noura@gmail.com',
      password: 'password',
    });
    component.login();
    expect(loginService.login).toHaveBeenCalledWith({
      email: 'noura@gmail.com',
      password: 'password',
    });
  });

  it('should set showValidationMessage to true on login error and then reset it to false after 6 seconds', fakeAsync(() => {
    spyOn(loginService, 'login').and.returnValue(
      new Observable((observer) => {
        observer.error({ error: 'Invalid credentials' });
      })
    );
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    component.login();
    tick(200);
    expect(component.showValidationMessage).toBe(true);
    tick(6000);
    expect(component.showValidationMessage).toBe(false);
  }));
});
