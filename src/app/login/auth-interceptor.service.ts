import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userData = null;

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      userData = JSON.parse(localStorage.getItem('userData'));
    }

    if (userData && userData._token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userData._token}` // Set the correct header
        }
      });
    }

    // Pass the request to the next handler
    return next.handle(req);
  }
}
