import {Component, TemplateRef} from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'toast-container',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)">

      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  styles: [':host {position: fixed; top: 0; right: 50%; margin: 0.5em; z-index: 1200;}']
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: {textOrTpl: string | TemplateRef<any>, options: any }) { return toast.textOrTpl instanceof TemplateRef; }
}