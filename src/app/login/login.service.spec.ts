import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AppService } from '../app.service';
import { LoggedInUserDto } from './login/LoggedInUserDto';
import { environment } from 'src/enviroment/enviroment';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpTestingController: HttpTestingController;
  let appService: AppService;
  class AppServiceMock {
    setUserInfo(_userInfo: LoggedInUserDto) {}
  }

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AppService, useClass: AppServiceMock },
        { provide: Router, useValue: routerSpy },
      ],
    });

    loginService = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
    appService = TestBed.inject(AppService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  it('should make a POST request and set user info on successful login', () => {
    const dummyUser: LoggedInUserDto = {
      userId: 1,
      email: 'test@example.com',
      password: 'password',
      firstName: 'test',
      lastName: 'test',
    };
    const loginDto = {
      email: 'test@example.com',
      password: 'password',
    };

    spyOn(appService, 'setUserInfo').and.callThrough();
    loginService.login(loginDto).subscribe((userLogin) => {
      expect(userLogin).toEqual(dummyUser);
      expect(appService.setUserInfo).toHaveBeenCalledOnceWith(dummyUser);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/accounts');
    });

    const req = httpTestingController.expectOne(
      environment.baseUrl + '/user/authenticate'
    );
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });
});
