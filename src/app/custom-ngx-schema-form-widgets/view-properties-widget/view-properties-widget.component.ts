import { Component } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';

@Component({
  selector: 'view-properties-widget',
  templateUrl: './view-properties-widget.component.html',
  styleUrls: ['./view-properties-widget.component.scss']
})
export class ViewPropertiesWidgetComponent extends ObjectLayoutWidget {}
