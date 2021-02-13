import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'boolean-field-widget',
  templateUrl: './boolean-field-widget.component.html',
  styleUrls: ['./boolean-field-widget.component.css']
})
export class BooleanFieldWidgetComponent extends ControlWidget {

  handleChange(value: boolean) {
    this.formProperty.setValue(value, false);
  }
}
