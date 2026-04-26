import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '@core/auth/services/auth.service';
import { LanguageStateService } from '@core/services/language-state.service';
import { TranslationService } from '@core/services/translation.service';
import { UtilsService } from '@shared/utils.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { LangSelectorComponent } from '../lang-selector/lang-selector.component';

@Component({
  selector: 'app-panel-display',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    LangSelectorComponent,
    ButtonModule
  ],
  templateUrl: './panel-display.component.html',
  styleUrl: './panel-display.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PanelDisplayComponent {
  private _messageService = inject(MessageService);
  private _translationService = inject(TranslationService);
  private _languageState = inject(LanguageStateService);

  protected authService = inject(AuthService);

  public translationControl = new FormControl('');
  public translation = input('');
  public text = input('');

  constructor() {
    effect(() => {
      const newValue = this.translation(); 
      this.translationControl.setValue(newValue);
    });
  }

  public copyText(text: string): void {
    UtilsService.copyToClickboard(text);
    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Text copied to clipboard' });
  }

  public favoriteTranslation(): void {
    this._translationService.saveTranslation(
      this.text(),
      this.translationControl.value || '',
      this._languageState.sourceLang(),
      this._languageState.targetLang()
    ).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Translation added to favorites' });
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add translation to favorites' });
      }
    })
  }
}
