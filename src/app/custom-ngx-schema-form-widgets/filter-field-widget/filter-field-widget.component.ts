import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';

@Component({
  selector: 'filter-field-widget',
  templateUrl: './filter-field-widget.component.html',
  styleUrls: ['./filter-field-widget.component.css']
})
export class FilterFieldWidgetComponent extends ObjectLayoutWidget implements OnDestroy {

  constructor() {
    super();
  }

  ngOnDestroy() {}
}
