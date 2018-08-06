import { Component, OnInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedAggregateFunctionsService } from '../../services/supported-aggregate-functions-service/supported-aggregate-functions.service';

@Component({
  selector: 'aggregate-selection-widget',
  templateUrl: './aggregate-selection-widget.component.html',
  styleUrls: ['./aggregate-selection-widget.component.css']
})
export class AggregateSelectionWidgetComponent extends ControlWidget {

  aggregateFunctions: Array<string>;

  constructor(private supportedAggregatesService: SupportedAggregateFunctionsService) {
    super();
    supportedAggregatesService.getSupportedAggregateFunctionFilterY().subscribe(
      (data: Array<string>) => this.aggregateFunctions = data // success path
      // error => this.error = error // error path
    );
  }

}
