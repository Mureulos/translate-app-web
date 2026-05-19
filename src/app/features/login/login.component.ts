import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { LanguageService } from '@core/services/language.service';
import { Language } from '@core/types/language.interface';
import { LoginResponse } from '@core/types/responses/auth-response.interface';
import { UtilsService } from '@shared/utils.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule, 
    ReactiveFormsModule, 
    ToastModule, 
    InputTextModule, 
    CarouselModule,
    DropdownModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _authService = inject(AuthService);
  private _messageService = inject(MessageService);
  private _router = inject(Router);
  private _utilsService = inject(UtilsService);
  private _languageService = inject(LanguageService);
  
  public languages = toSignal(
    this._languageService.getLanguages().pipe(
      map(res => res.response)
    ),
    { initialValue: [] as Language[] }
  );

  public authScreens = [1, 2];

  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  protected registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    defaultLanguage: new FormControl(null, [Validators.required]), 
  });

  onSubmitLogin(): void {
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
    } else {
       this._messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha os campos corretamente.' });
    }
  }

  onSubmitRegister(): void {
    console.log('Status do Formulário:', this.registerForm.status);
    console.log('Valores atuais:', this.registerForm.value);
    
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      if (formValues.password !== formValues.confirmPassword) {
        this._messageService.add({ severity: 'error', summary: 'Erro', detail: 'As senhas não coincidem.' });
        return;
      }

      const registerPayload = {
        name: formValues.name,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        defaultLanguage: formValues.defaultLanguage
      };

      this._utilsService.show();

      console.log('Register payload:', registerPayload);

      // this._authService.register(registerPayload) 
      // .pipe(
      //   finalize(() => this._utilsService.hide())
      // )
      // .subscribe({
      //   next: () => {
      //     this._messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Conta criada com sucesso! Faça login.' });
      //     this.registerForm.reset();
      //   },
      //   error: (error) => {
      //     this._messageService.add({ severity: 'error', summary: 'Erro', detail: error.message || 'Falha ao registrar.' });
      //   }
      // });
    } else {
      this._messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos corretamente.' });
      this.registerForm.markAllAsTouched();
    }
  }
}