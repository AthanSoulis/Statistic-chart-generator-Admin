import { Component } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'color-picker-widget',
  templateUrl: './color-picker-widget.component.html',
  styleUrls: ['./color-picker-widget.component.scss']
})
export class ColorPickerWidgetComponent extends ControlWidget {

  changeColor(event: any) {
    this.control.setValue(event);
  }
}
