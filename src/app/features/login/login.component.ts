import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { LoginResponse } from '@core/types/responses/auth-response.interface';
import { UtilsService } from '@shared/utils.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, ɵInternalFormsSharedModule, ReactiveFormsModule, ToastModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _messageService = inject(MessageService);
  private _router = inject(Router);
  private _utilsService = inject(UtilsService);

  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value;

      this._utilsService.show();

      this._authService.login(loginRequest)
      .pipe(
        finalize(() => this._utilsService.hide())
      )
      .subscribe({
        next: (response: LoginResponse) => {
          if (response && response.token)
            this._authService.setToken(response.token);

          this._router.navigate(['']);
        },
        error: (error) => {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        },
        complete: () => {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
        }
      });
    }
  }
}
