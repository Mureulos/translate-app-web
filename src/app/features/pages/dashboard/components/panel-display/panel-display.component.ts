import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
  private messageService = inject(MessageService);
  
  public translationControl = new FormControl('');
  public translation = input('');

  constructor() {
    effect(() => {
      const newValue = this.translation(); 
      this.translationControl.setValue(newValue);
    });
  }

  public copyText(text: string): void {
    UtilsService.copyToClickboard(text);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Text copied to clipboard' });
  }
}
