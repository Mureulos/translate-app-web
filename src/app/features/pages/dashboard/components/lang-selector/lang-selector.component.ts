import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { LanguageStateService } from '@core/services/language-state.service';
import { LanguageService } from '@core/services/language.service';
import { Language } from '@core/types/responses/translate-response.interface.ts';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { map } from 'rxjs';

@Component({
  selector: 'app-lang-selector',
  imports: [SelectButtonModule, FormsModule, MenuModule, ButtonModule],
  templateUrl: './lang-selector.component.html',
  styleUrl: './lang-selector.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LangSelectorComponent {
  private _languageStateService = inject(LanguageStateService);
  private _languageService = inject(LanguageService);
  
  public target = input(false);

  public languages = toSignal(
    this._languageService.getLanguages().pipe(
      map(res => res.response)
    ),
    { initialValue: [] as Language[] }
  );
  public menuOptions = computed(() => {
    return this.languages().map(l => ({
      label: l.name,
      command: () => this.setLanguage(l.id)
    }));
  });

  public getLanguage = computed(() => {
    if (this.target() === true)
      return this._languageStateService.sourceLang();
    else
      return this._languageStateService.targetLang();
  });

  public currentLabel = computed(() => {
    const currentId = this.getLanguage();
    const found = this.languages().find(l => l.id === currentId);
    return found ? found.name : 'Select a language';
  });

  public setLanguage(idLanguage: number): void {
    if (!idLanguage) return;

    if (this.target() === true)
      this._languageStateService.setSourceLang(idLanguage);
    else
      this._languageStateService.setTargetLang(idLanguage);
  }

  public swapLanguage(): void {
    const currentSource = this._languageStateService.sourceLang();
    const currentTarget = this._languageStateService.targetLang();

    this._languageStateService.setSourceLang(currentTarget);
    this._languageStateService.setTargetLang(currentSource);
  }
}
