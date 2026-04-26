import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '@core/tokens/api.token';
import { LoginRequest } from '@core/types/requests/auth-request.interface';
import { LoginResponse } from '@core/types/responses/auth-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _apiUrl = inject(API_URL);
  private readonly _http = inject(HttpClient);

  public login(authRequest: LoginRequest ): Observable<LoginResponse>  {
    return this._http.post<LoginResponse>(`${this._apiUrl}auth/login`, authRequest);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  public clearToken(): void {
    localStorage.removeItem('auth_token');
  }
}
