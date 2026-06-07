import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

let loading = false;

export function AuthInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (token) {
    request = addToken(request, token);
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !request.url.includes('/login')) {
        return handle401Error(authService, router);
      }

      return throwError(() => error);
    }),
  );
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        messageService.add({
          severity: 'error',
          summary: 'Servidor Offline',
          detail: 'Não foi possível conectar à API. Verifique se o servidor está em execução.',
          life: 6000
        });
      }

      return throwError(() => error);
    })
  );
};

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(authService: AuthService, router: Router): Observable<HttpEvent<any>> {
  if (!loading) {
    loading = true;
    authService.clearToken();
    router.navigate(['/login']);
  }

  loading = false;
  return throwError(() => new Error('Token inválido ou expirado'));
}
