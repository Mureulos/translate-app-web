import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '@core/auth/services/auth.service';
import { UtilsService } from '@shared/utils.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { LangSelectorComponent } from '../lang-selector/lang-selector.component';

@Component({
  selector: 'app-panel-input',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    LangSelectorComponent,
    ButtonModule,
    FileUploadModule,
  ],
  templateUrl: './panel-input.component.html',
  styleUrl: './panel-input.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PanelInputComponent {
  @ViewChild('fu') public fileUploadComponent!: FileUpload;

  private messageService = inject(MessageService);
  protected _authService = inject(AuthService);
  
  public translationControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(300),
  ]);

  public textEvent = output<string>();
  public fileEvent = output<File>();

  public selectedFile: File | null = null;

  public submitTranslation(): void {
    if (this.selectedFile) {
      this.fileEvent.emit(this.selectedFile);
      this.clearFile(this.fileUploadComponent);
      return;
    }

    if (this.translationControl.valid) {
      this.textEvent.emit(this.translationControl.value ?? '');
    }
  }

  public copyText(text: string): void {
    UtilsService.copyToClickboard(text);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Text copied to clipboard',
    });
  }

  public onFileSelect(event: any): void {
    const file = event.files[0] as File;
    if (file) {
      this.selectedFile = file;
      this.translationControl.disable();
    }
  }

  public clearFile(fileUpload: any): void {
    this.selectedFile = null;
    fileUpload?.clear();
    this.translationControl.enable();
  }
}