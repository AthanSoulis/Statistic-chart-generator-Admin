import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormSchema } from '../../chart-creator/chart-form-schema.model';
import { ObjectLayoutWidget } from 'ngx-schema-form';

@Component({
  selector: 'head-menu-widget',
  templateUrl: './head-menu-widget.component.html',
  styleUrls: ['./head-menu-widget.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadMenuWidgetComponent extends ObjectLayoutWidget {


}
