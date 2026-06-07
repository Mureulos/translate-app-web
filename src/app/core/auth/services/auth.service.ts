import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '@core/tokens/api.token';
import { LoginRequest } from '@core/types/requests/auth-request.interface';
import { LoginResponse } from '@core/types/responses/auth-response.interface';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _apiUrl = inject(API_URL);
  private readonly _http = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _messageService = inject(MessageService);

  private _autoLogoutTimeout: any;
  private _countdownInterval: any;

  public timeRemaining = signal<number>(0);

  public formattedTimeRemaining = computed(() => {
    const totalSeconds = Math.floor(this.timeRemaining() / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  public signin(authRequest: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(
      `${this._apiUrl}auth/signin`,
      authRequest,
    );
  }

  public login(authRequest: LoginRequest): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(
      `${this._apiUrl}auth/login`,
      authRequest,
    );
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.startTokenTimer(token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  private isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = window.atob(payload);
      const parsedPayload = JSON.parse(decodedPayload);

      const expirationDate = parsedPayload.exp * 1000;
      const now = Date.now();

      return now >= expirationDate;
    } catch (e) {
      return true;
    }
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    if (this.isTokenExpired(token)) {
      this.clearToken();
      return false;
    }

    return true;
  }

  public clearToken(): void {
    localStorage.removeItem('token');
    this.stopTokenTimer();
  }

  public startTokenTimer(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const expDate = payload.exp * 1000;
      const timeUntilExpiration = expDate - new Date().getTime();

      if (timeUntilExpiration > 0) {
        this._autoLogoutTimeout = setTimeout(() => {
          this.autoLogout();
        }, timeUntilExpiration);

        this.timeRemaining.set(timeUntilExpiration);
        this._countdownInterval = setInterval(() => {
          const remaining = expDate - new Date().getTime();
          if (remaining > 0) {
            this.timeRemaining.set(remaining);
          } else {
            this.timeRemaining.set(0);
            clearInterval(this._countdownInterval);
          }
        }, 1000);
      } else {
        this.autoLogout();
      }
    } catch (e) {
      console.error('Falha ao processar o token', e);
      this.autoLogout();
    }
  }

  private stopTokenTimer(): void {
    if (this._autoLogoutTimeout) clearTimeout(this._autoLogoutTimeout);
    if (this._countdownInterval) clearInterval(this._countdownInterval);
    this.timeRemaining.set(0);
  }

  private autoLogout(): void {
    this.clearToken();
    this._router.navigate(['/login']);
    this._messageService.add({
      severity: 'warn',
      summary: 'Sessão Expirada',
      detail: 'Sua sessão expirou por segurança. Faça login novamente.',
    });
  }
}
