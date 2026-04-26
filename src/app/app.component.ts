import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressSpinnerComponent } from '@shared/components/progress-spinner/progress-spinner.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ProgressSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}