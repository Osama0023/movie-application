import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.module";
import { isPlatformBrowser } from '@angular/common';

export interface AuthResponseData {
  token: string;
  refreshToken: string;
  expiresIn: number;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private redirectUrl: string = '';
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.autoLogin();
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/auth/signup', {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.token,
            resData.refreshToken,
            resData.expiresIn
          );
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
          this.handleAuthentication(
            resData.token,
            resData.refreshToken,
            resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      if (!userData) {
        return;
      }

      const loadedUser = new User(
        userData._token,
        userData._refreshToken,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = 
          new Date(userData._tokenExpirationDate).getTime() - 
          new Date().getTime();
        this.autoRefreshToken(expirationDuration);
      } else if (loadedUser.refreshToken) {
        this.refreshToken(loadedUser.refreshToken).subscribe();
      }
    }
  }

  refreshToken(refreshToken: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/auth/refresh-token', {
        refreshToken: refreshToken
      })
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(
            response.token,
            response.refreshToken,
            response.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private autoRefreshToken(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData && userData._refreshToken) {
        this.refreshToken(userData._refreshToken).subscribe();
      }
    }, expirationDuration - 60000); // Refresh 1 minute before expiration
  }

  private handleAuthentication(
    token: string,
    refreshToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(token, refreshToken, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoRefreshToken(expiresIn * 1000);
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

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (errorRes.error && errorRes.error.message) {
      errorMessage = errorRes.error.message;
    } else if (errorRes.error && errorRes.error.error && errorRes.error.error.message) {
      errorMessage = errorRes.error.error.message;
    }

    return throwError(() => errorMessage);
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }

  clearRedirectUrl() {
    this.redirectUrl = '';
  }

  isAuthenticated(): boolean {
    // Implement your authentication check here
    // For example, check if there's a valid token in localStorage
    return !!localStorage.getItem('token');
  }
}
