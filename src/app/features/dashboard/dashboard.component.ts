import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { LanguageStateService } from '@core/services/language-state.service';
import { TranslationService } from '@core/services/translation.service';
import { TranslationResponse } from '@core/types/responses/translate-response.interface.ts';
import { UtilsService } from '@shared/utils.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { StepperModule } from 'primeng/stepper';
import { finalize } from 'rxjs';
import { FavoriteTranslationsComponent } from './components/favorite-translations/favorite-translations.component';
import { PanelDisplayComponent } from "./components/panel-display/panel-display.component";
import { PanelInputComponent } from './components/panel-input/panel-input.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PanelDisplayComponent, PanelInputComponent, StepperModule, ButtonModule, FavoriteTranslationsComponent, CarouselModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public activeStep: number = 1;
  public router = inject(Router);
  public text: string = ''; 
  public sourceLang = signal('en');
  public targetLang = signal('fr');
  public translation: string = '';
  public dashboardScreens = [1, 2];
  public activePage: number = 0;

  private _utilsService = inject(UtilsService);
  private _messageService = inject(MessageService);
  private _translationService = inject(TranslationService);

  protected _languageState = inject(LanguageStateService);
  protected _authService = inject(AuthService);

  private _translate(): void {
    if (!this.text || this.text.trim() === '') {
      this.translation = '';
      return;
    }

    this._utilsService.show();

    const source = this._languageState.sourceLang();
    const target = this._languageState.targetLang();

    this._translationService.translation(this.text, source, target)
    .pipe(
      finalize(() => this._utilsService.hide())
    )
    .subscribe({
      next: (response: TranslationResponse) => {
        this.translation = response.response.translationText;
      },
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

  public logout(): void {
    this._authService.clearToken();
    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged out successfully' });
  }

  public translateFile(file: File): void {
    this._utilsService.show();

    const source = this._languageState.sourceLang();
    const target = this._languageState.targetLang();

    this._translationService.translateFile(file, source, target)
    .pipe(
      finalize(() => this._utilsService.hide())
    )
    .subscribe({
      next: (response: TranslationResponse) => {
        this.translation = response.response.translationText;
      },
      error: () => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to translate file' });
      }
    });
  }
}