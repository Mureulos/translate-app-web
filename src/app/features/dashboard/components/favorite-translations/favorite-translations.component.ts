import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/auth/services/auth.service';
import { TranslationService } from '@core/services/translation.service';
import { SaveTranslationDetail } from '@core/types/responses/save-translate-response.interface';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorite-translations',
  standalone: true,
  imports: [MatIconModule, DatePipe],
  templateUrl: './favorite-translations.component.html',
  styleUrl: './favorite-translations.component.scss',
})
export class FavoriteTranslationsComponent implements OnInit {
  private _authService = inject(AuthService);
  private _translationService = inject(TranslationService);
  private _messageService = inject(MessageService);

  public translationsSaved: SaveTranslationDetail[] = [];

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this.loadFavoriteTranslations();
    }
  }

  private loadFavoriteTranslations(): void {
    this._translationService.getSavedTranslation().subscribe({
      next: (response) => {
        this.translationsSaved = response.response || [];
      },
      error: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar as traduções favoritas',
        });
      },
    });
  }

  public removeFromFavorites(translationId: number): void {
    this._translationService.deleteSavedTranslation(translationId).subscribe({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tradução removida dos favoritos',
        });
        
        this.translationsSaved = this.translationsSaved.filter(t => t.id !== translationId);
      },
      error: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao remover tradução dos favoritos',
        });
      },
    });
  }

  public clearAllFavorites(): void {
    if (this.translationsSaved.length === 0) return;

    const deleteRequests = this.translationsSaved.map(t =>
      this._translationService.deleteSavedTranslation(t.id)
    );

    forkJoin(deleteRequests).subscribe({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Todas as traduções foram removidas',
        });
        this.translationsSaved = [];
      },
      error: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao remover algumas traduções',
        });
        this.loadFavoriteTranslations();
      }
    });
  }
}