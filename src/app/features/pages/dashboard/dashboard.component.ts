import { Component, inject, signal } from '@angular/core';
import { LanguageStateService } from '@core/services/language-state.service';
import { TranslationService } from '@core/services/translation.service';
import { TranslationResponse } from '@core/types/responses/translate-response';
import { PanelDisplayComponent } from "./components/panel-display/panel-display.component";
import { PanelInputComponent } from './components/panel-input/panel-input.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PanelDisplayComponent, PanelInputComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public text: string = ''; 
  public sourceLang = signal('en');
  public targetLang = signal('fr');
  public translation: string = '';

  public loading: boolean = false;
  private _translationService = inject(TranslationService);
  public _languageState = inject(LanguageStateService);

  private _translate(): void {
    if (!this.text || this.text.trim() === '') {
      this.translation = '';
      return;
    }

    this.loading = true;
    const source = this._languageState.sourceLang();
    const target = this._languageState.targetLang();

    this._translationService.translation(this.text, source, target)
    .subscribe({
      next: (response: TranslationResponse) => {
        this.translation = response.translation.translation;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  public updateText(text: string): void {
    this.text = text;
    this._translate();
  }

  public updateSourceLang(source: number): void {
    this._languageState.setSourceLang(source);
    this._translate();
  }

  public updateTargetLang(target: number): void {
    this._languageState.setTargetLang(target);
    this._translate();
  }
}