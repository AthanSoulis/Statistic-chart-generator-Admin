import { Component, AfterContentInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';

@Component({
  selector: 'filter-array-widget',
  templateUrl: './filter-array-widget.component.html',
  styleUrls: ['./filter-array-widget.component.scss']
})
export class FilterArrayWidgetComponent extends ArrayLayoutWidget implements AfterContentInit, AfterViewChecked {

  deleteButtonPosition: DeleteButtonPosition;

  constructor(private chartloadingService: ChartLoadingService,
              private cdr: ChangeDetectorRef) {
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

  ngAfterViewChecked() {
    this.cdr.markForCheck();
  }

  get arrayItems(): number {
    return (<FormProperty[]>this.formProperty.properties).length;
  }

  addItem() {
    if ( this.arrayItems < this.schema.maxItems) {
      this.formProperty.addItem();
    } else if (this.schema.maxItems === undefined ) {
      this.formProperty.addItem();
    }
  }

  removeItem(index: number) {
    this.formProperty.removeItem(this.formProperty.properties[index]);
  }

  trackByIndex(index: number, item: any) {
    return item;
  }
}

enum DeleteButtonPosition {
  out = 'out',
  in = 'in'
}
