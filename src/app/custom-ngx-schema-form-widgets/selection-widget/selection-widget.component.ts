import { Component } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'selection-widget',
  templateUrl: './selection-widget.component.html',
  styleUrls: ['./selection-widget.component.css']
})
export class SelectionWidgetComponent extends ControlWidget {}
