import { Component, OnInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'string-field-widget',
  templateUrl: './string-field-widget.component.html',
  styleUrls: ['./string-field-widget.component.css']
})
export class StringFieldWidgetComponent extends ControlWidget {

  getInputType() {

    if (!this.schema.widget.id || this.schema.widget.id === 'csui-string') {
      return 'text';
    } else {
      return this.schema.widget.id;
    }
  }
}
