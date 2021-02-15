import { Component } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';

@Component({
  selector: 'category-properties-widget',
  templateUrl: './category-properties-widget.component.html',
  styleUrls: ['./category-properties-widget.component.scss']
})
export class CategoryPropertiesWidgetComponent extends ObjectLayoutWidget {

  constructor() { super(); }

}
