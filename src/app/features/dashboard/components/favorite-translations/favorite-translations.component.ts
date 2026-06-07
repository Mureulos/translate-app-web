import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/auth/services/auth.service';
import { TranslationService } from '@core/services/translation.service';
import { SaveTranslationDetail } from '@core/types/responses/save-translate-response.interfac';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-favorite-translations',
  imports: [MatIconModule, DatePipe],
  templateUrl: './favorite-translations.component.html',
  styleUrl: './favorite-translations.component.scss',
})
export class FavoriteTranslationsComponent {
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
        this.translationsSaved = response.response;
      },
      error: (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load favorite translations',
        });
      },
    });
  }

  public removeFromFavorites(translationId: number): void {
    this._translationService.deleteSavedTranslation(translationId).subscribe({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Translation removed from favorites',
        });
        this.loadFavoriteTranslations();
      },
      error: (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to remove translation from favorites',
        });
      },
    });
  }
}
