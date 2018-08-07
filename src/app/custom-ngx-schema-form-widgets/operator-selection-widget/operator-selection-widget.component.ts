import { Component, OnInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedFilterTypesService, FilterType } from '../../services/supported-filter-types-service/supported-filter-types.service';

@Component({
  selector: 'operator-selection-widget',
  templateUrl: './operator-selection-widget.component.html',
  styleUrls: ['./operator-selection-widget.component.css']
})
export class OperatorSelectionWidgetComponent extends ControlWidget {

  operators: Array<FilterType> = null ;

  constructor(private operatorsService: SupportedFilterTypesService) {
    super();
    this.operatorsService.getSupportedFilterTypes().subscribe(
      (data: Array<FilterType>) => this.operators = data // success path
        // error => this.error = error // error path
    );
   }

}
