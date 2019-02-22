import { Component, OnInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'number-field-widget',
  templateUrl: './number-field-widget.component.html',
  styleUrls: ['./number-field-widget.component.css']
})
export class NumberFieldWidgetComponent extends ControlWidget {}
