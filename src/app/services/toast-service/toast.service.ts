import { Injectable, TemplateRef } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToastService {

  toasts: {textOrTpl: string | TemplateRef<any>, options: any}[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: {textOrTpl: string | TemplateRef<any>, options: any}) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
