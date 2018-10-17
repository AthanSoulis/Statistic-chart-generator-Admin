import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedAggregateFunctionsService } from '../../services/supported-aggregate-functions-service/supported-aggregate-functions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aggregate-selection-widget',
  templateUrl: './aggregate-selection-widget.component.html',
  styleUrls: ['./aggregate-selection-widget.component.css']
})
export class AggregateSelectionWidgetComponent extends ControlWidget implements AfterContentInit {

  aggregateFunctions: Array<string>;

  constructor(private supportedAggregatesService: SupportedAggregateFunctionsService) {
    super();

    supportedAggregatesService.getSupportedAggregateFunctionFilterY().subscribe(
      (data: Array<string>) => this.aggregateFunctions = data // success path
      // error => this.error = error // error path
    );
  }

  ngAfterContentInit() {}
}
