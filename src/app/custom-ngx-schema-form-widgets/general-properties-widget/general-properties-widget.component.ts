import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';

@Component({
  selector: 'general-properties-widget',
  templateUrl: './general-properties-widget.component.html',
  styleUrls: ['./general-properties-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralPropertiesWidgetComponent extends ObjectLayoutWidget {}
