import { Component, ViewChild } from '@angular/core';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  isAdmin: string;
  error: string = null;
  helper = new JwtHelperService();
  passwordsMatch = true;

  @ViewChild('authForm') authForm: NgForm;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.authForm) {
      this.authForm.reset();
    }
    this.passwordsMatch = true;
    this.error = null;
  }

  checkPasswordMatch(form: NgForm) {
    if (!this.isLoginMode) {
      const password = form.value.password;
      const confirmPassword = form.value.confirmPassword;
      this.passwordsMatch = !confirmPassword || password === confirmPassword;
      console.log('passwordsMatch', this.passwordsMatch);
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    console.log('fffffffffffff',email ,password, confirmPassword);
    if (!this.isLoginMode) {
      if (password !== confirmPassword) {
        this.error = 'Passwords must match';
        return;
      }
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (resData: AuthResponseData) => {
        const deccodedToken = this.helper.decodeToken(resData.token);
        this.isAdmin = deccodedToken.role;
        if (this.isAdmin == 'admin') {
          this.router.navigate(['admin-dashboard']);
        } else {
          this.router.navigate(['home']);
        }
        this.isLoading = false;
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }
}
