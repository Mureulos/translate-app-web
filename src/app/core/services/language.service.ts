import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../tokens/api.token';
import { Language } from '../types/language.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly _apiUrl = inject(API_URL);
  private readonly _http = inject(HttpClient);
  
  public getLanguages(): Observable<{ response: Language[] }> {
    return this._http.get<{ response: Language[] }>(`${this._apiUrl}language`);
  }

  public getLanguageById(languageId: number): Observable<{ response: Language }> {
    const params = new HttpParams().set('id', languageId)
    return this._http.get<{ response: Language }>(`${this._apiUrl}language`, { params });
  }
}
