import { Component, OnInit, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'radio-widget',
  templateUrl: './radio-widget.component.html',
  styleUrls: ['./radio-widget.component.scss']
})
export class RadioWidgetComponent extends ControlWidget {

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  handleChange(value: any) {
    this.control.setValue(value);
  }
}
