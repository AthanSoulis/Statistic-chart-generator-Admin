import { Component, OnInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedChartTypesService } from '../../services/supported-chart-types-service/supported-chart-types.service';

@Component({
  selector: 'chart-type-selection-widget',
  templateUrl: './chart-type-selection-widget.component.html',
  styleUrls: ['./chart-type-selection-widget.component.css']
})
export class ChartTypeSelectionWidgetComponent extends ControlWidget {

  supportedChartTypes: Array<string>;

  constructor(private chartTypesService: SupportedChartTypesService) {
    super();
    chartTypesService.getSupportedChartTypes().subscribe(
      (data: Array<string>) => this.supportedChartTypes = data // success path
      // error => this.error = error // error path
    );
   }

}
