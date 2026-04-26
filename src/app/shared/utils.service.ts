import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public isLoading = signal<boolean>(false);
  
  constructor() {}

  static copyToClickboard(textToCopy: string): void {
    if (navigator.clipboard)
      navigator.clipboard.writeText(textToCopy)
  }

  public show(): void {
    this.isLoading.set(true);
  }

  public hide(): void {
    this.isLoading.set(false);
  }
}
