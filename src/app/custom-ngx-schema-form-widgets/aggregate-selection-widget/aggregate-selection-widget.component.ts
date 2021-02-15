import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedAggregateFunctionsService, AggregateFunction } from '../../services/supported-aggregate-functions-service/supported-aggregate-functions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'aggregate-selection-widget',
  templateUrl: './aggregate-selection-widget.component.html',
  styleUrls: ['./aggregate-selection-widget.component.scss']
})
export class AggregateSelectionWidgetComponent extends ControlWidget implements AfterContentInit {

  aggregateFunctions: Array<AggregateFunction>;

  constructor(private supportedAggregatesService: SupportedAggregateFunctionsService) {
    super();

    supportedAggregatesService.getSupportedAggregateFunctionFilterY().subscribe(
      (data: Array<AggregateFunction>) => this.aggregateFunctions = data // success path
      // error => this.error = error // error path
    );
  }

  ngAfterContentInit() {}
}
