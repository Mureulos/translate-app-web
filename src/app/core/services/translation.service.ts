import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../tokens/api.token';
import { TranslationResponse } from '../types/responses/translate-response.interface.ts';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly _apiUrl = inject(API_URL);
  private readonly _http = inject(HttpClient);

  public translation(
    text: string, 
    sourceLanguageId: number, 
    targetLanguageId: number
  ): Observable<TranslationResponse> {
    // const params = new HttpParams()
    //   .set('text', text)
    //   .set('sourceLanguageId', sourceLanguageId)
    //   .set('targetLanguageId', targetLanguageId);

    return this._http.post<TranslationResponse>(`${this._apiUrl}translation`, { 
      text: text,
      sourceLanguageId: sourceLanguageId,
      targetLanguageId: targetLanguageId 
    });
  }
} 
