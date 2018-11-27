import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'color-picker-widget',
  templateUrl: './color-picker-widget.component.html',
  styleUrls: ['./color-picker-widget.component.css']
})
export class ColorPickerWidgetComponent extends ControlWidget implements AfterContentInit {

  color: string;

  ngAfterContentInit() {
    this.color = this.formProperty.value;
  }

  changeColor(event: any) {

    console.log('Color Event: ', event);

    this.control.setValue(event);
  }
}
