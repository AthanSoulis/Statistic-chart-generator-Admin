import { Component, OnInit, AfterContentInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ArrayLayoutWidget, ControlWidget } from 'ngx-schema-form';
import { FormProperty, PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';
import { ArrayProperty } from 'ngx-schema-form/lib/model/arrayproperty';
import { ObjectProperty } from 'ngx-schema-form/lib/model/objectproperty';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';

@Component({
  selector: 'array-widget',
  templateUrl: './array-widget.component.html',
  styleUrls: ['./array-widget.component.css'],
})
export class ArrayWidgetComponent extends ArrayLayoutWidget implements AfterContentInit {

  deleteButtonPosition: DeleteButtonPosition;

  constructor(private chartloadingService: ChartLoadingService) {
    super();
  }

  ngAfterContentInit() {

    if (this.schema.deleteButtonPosition === null || this.schema.deleteButtonPosition === undefined ) {
      this.deleteButtonPosition = DeleteButtonPosition.out;
    } else {
      this.deleteButtonPosition = this.schema.deleteButtonPosition;
    }

    if (!this.chartloadingService.chartLoadingStatus && this.schema.minItems !== null && this.schema.minItems !== undefined) {
      for (let index = 0; index < this.schema.minItems; index++ ) {
        this.addItem();
      }
    }
  }

  addItem() {
    if ( (<FormProperty[]>this.formProperty.properties).length < this.schema.maxItems) {
      this.formProperty.addItem();
    } else if (this.schema.maxItems === undefined ) {
      this.formProperty.addItem();
    }
  }

  removeItem(index: number) {
    this.formProperty.removeItem(index);
  }

  trackByIndex(index: number, item: any) {
    return item;
  }
}

export enum DeleteButtonPosition {
  out = 'out',
  in = 'in'
}
