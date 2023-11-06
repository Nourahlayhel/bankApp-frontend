import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  showValidationMessage: boolean = false;

  constructor(private loginService: LoginService) {
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required),
    // });
  }

  login() {
    if (this.loginForm?.valid) {
      this.loginService
        .login(this.loginForm.value)
        .pipe(take(1))
        .subscribe({
          error: (error: any) => {
            if (error) {
              this.showValidationMessage = true;
            }
          },
        });
    }
  }
}
