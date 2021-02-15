import { Component } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';

@Component({
  selector: 'filter-property-widget',
  templateUrl: './filter-property-widget.component.html',
  styleUrls: ['./filter-property-widget.component.scss']
})
export class FilterPropertyWidgetComponent extends ObjectLayoutWidget {

  constructor() {
    super();
   }

}
