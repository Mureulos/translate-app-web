import { Component, inject } from '@angular/core';
import { UtilsService } from '@shared/utils.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-progress-spinner',
  imports: [ProgressSpinnerModule],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
})
export class ProgressSpinnerComponent {
  protected utilsService = inject(UtilsService);
}
