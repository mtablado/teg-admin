import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';

import { log } from '../log/logger.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  private logger: debug.Debugger = log.extend('logging-interceptor');

  constructor(/*private messenger: MessageService*/) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logger('LoggingInterceptor Intercepting ' + req.url );

    const started = Date.now();
    let msg: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => {
            msg = event instanceof HttpResponse ? 'succeeded' : '';
          },
        ),
        catchError(
          // Operation failed; error is an HttpErrorResponse
          error => {
            msg = `failed (error code: ${error.status}, body was: ${JSON.stringify(error.error)})`;
            return Observable.throw(error);
          },
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const logMsg = `${req.method} "${req.urlWithParams}"
             ${msg} in ${elapsed} ms.`;

          // this.messenger.add(msg);
          this.logger(logMsg);
        }),
      );
  }
}
