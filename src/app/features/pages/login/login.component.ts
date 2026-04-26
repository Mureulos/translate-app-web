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
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, ɵInternalFormsSharedModule, ReactiveFormsModule, ToastModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value;

      this.authService.login(loginRequest).subscribe({
        next: (response: LoginResponse) => {
          if (response && response.token)
            this.authService.setToken(response.token);

          this.router.navigate(['']);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        },
        complete: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
        }
      });
    }
  }
}
