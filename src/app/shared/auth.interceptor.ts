import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authenticatedRequest = request.clone({
    setHeaders: {
      token: 'abcd',
    },
  });

  return next(authenticatedRequest).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        return event.clone({
          headers: event.headers.set('success', 'true'),
        });
      }

      return event;
    })
  );
};
