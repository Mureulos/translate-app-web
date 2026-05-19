import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
  private translationService = inject(TranslationService);
  private _messageService = inject(MessageService);

  public translationsSaved: SaveTranslationDetail[] = [];

  ngOnInit() {
    this.loadFavoriteTranslations();
  }

  private loadFavoriteTranslations(): void {
    this.translationService.getSavedTranslation().subscribe({
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
    this.translationService.deleteSavedTranslation(translationId).subscribe({
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
