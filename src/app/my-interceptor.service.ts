import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<Record<string, unknown>>,
    next: HttpHandler,
  ) {
    if (
      (request.method === 'POST' )
    ) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });
    }

    return next.handle(request);
  }
}