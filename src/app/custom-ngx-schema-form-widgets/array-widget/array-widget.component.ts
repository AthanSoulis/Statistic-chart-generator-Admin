import { Component, OnInit } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';

@Component({
  selector: 'array-widget',
  templateUrl: './array-widget.component.html',
  styleUrls: ['./array-widget.component.css']
})
export class ArrayWidgetComponent extends ArrayLayoutWidget {

  constructor() {
    super();
   }

   addItem() {
     this.formProperty.addItem();
   }

   removeItem(index: number) {
    this.formProperty.removeItem(index);
  }

  trackByIndex(index: number, item: any) {
    return index;
  }

}
