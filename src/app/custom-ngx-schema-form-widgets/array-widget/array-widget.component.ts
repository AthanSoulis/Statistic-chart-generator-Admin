import { Component, OnInit, AfterContentInit, ChangeDetectionStrategy } from '@angular/core';
import { ArrayLayoutWidget, ControlWidget } from 'ngx-schema-form';
import { FormProperty, PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';
import { ArrayProperty } from 'ngx-schema-form/lib/model/arrayproperty';
import { ObjectProperty } from 'ngx-schema-form/lib/model/objectproperty';

@Component({
  selector: 'array-widget',
  templateUrl: './array-widget.component.html',
  styleUrls: ['./array-widget.component.css'],
})
export class ArrayWidgetComponent extends ArrayLayoutWidget {

  constructor() {
    super();
   }

  addItem() {
    if ( (<FormProperty[]>this.formProperty.properties).length < this.schema.maxItems) {
      this.formProperty.addItem();
    } else if (this.schema.maxItems === undefined ) {
      this.formProperty.addItem();
    }
  }

  removeItem(index: number) {
    this.formProperty.removeItem(index);
  }

  trackByIndex(index: number, item: any) {
    return item;
  }
}
