import { Component } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';

@Component({
  selector: 'boolean-field-widget',
  templateUrl: './boolean-field-widget.component.html',
  styleUrls: ['./boolean-field-widget.component.scss']
})
export class BooleanFieldWidgetComponent extends ControlWidget {

  handleChange(value: boolean) {
    this.formProperty.setValue(value, false);
  }

  ngAfterViewInit()
  {
    super.ngAfterViewInit();

    if(this.schema.readOnly)
      this.control.disable();
  }
}
