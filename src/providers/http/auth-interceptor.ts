import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { NbAuthService, NbAuthToken } from '@nebular/auth';

import { log } from '../log/logger.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private logger: debug.Debugger = log.extend('auth-interceptor');
  private authToken: any;

  constructor(private authService: NbAuthService) {
    this.loadToken();
    this.listenTokenChanges();
  }

  loadToken(): void {
    this.authService.getToken()
      .subscribe((token: NbAuthToken) => {
        this.authToken = token.getValue();
      });
  }

  listenTokenChanges(): void {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {
        if (token.isValid()) {
          this.authToken = token.getValue();
        }
      });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.logger('AuthInterceptor Intercepting ' + req.url );
    // const AUTH_ERROR: number = 401;

    if (!req.url.endsWith('/oauth/token')) {
      this.logger('AuthInterceptor request intercepted. Adding token header');

      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authToken),
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);

    } else {
      this.logger('AuthInterceptor /oauth/token request intercepted. Leaving the request as it is.');
      return next.handle(req);
    }

  }

}
