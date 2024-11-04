import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.module";
import { isPlatformBrowser } from '@angular/common';

export interface AuthResponseData {
  token: string;
  role:string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inject platform ID
  ) {
    this.autoLogin();
  }

  signUp(email: string, password: string, password_confirmation: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/auth/signup', {
        user: {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.token);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/auth/signin', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.token);
        })
      );
  }

  autoLogin() {
    if (isPlatformBrowser(this.platformId)) {
      const userData: { token: string } = JSON.parse(localStorage.getItem('userData'));

      if (!userData || !userData.token) {
        return;
      }

      // Authenticate user with token from localStorage
      this.handleAuthentication(userData.token);
    }
  }

  //forget password 
  forgetpassword(email: string){

  }

  // decodeToken(token: string): any {
  //   try {
  //     return jwt_decode(token);  // jwt_decode is now callable with the correct import
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return null;
  //   }
  // }

  // getRoleFromToken(token: string): string {
  //   const decodedToken = this.decodeToken(token);
  //   return decodedToken ? decodedToken.role : null;
  // }

  private handleAuthentication(token: string) {
    const user = new User(token);
    this.user.next(user);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid credentials.';
        break;
    }
    return throwError(errorMessage);
  }
}
