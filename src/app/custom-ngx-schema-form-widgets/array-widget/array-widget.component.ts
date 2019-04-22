import { Component, OnInit, AfterContentInit, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ArrayLayoutWidget, ControlWidget } from 'ngx-schema-form';
import { FormProperty } from '../../../../node_modules/ngx-schema-form/lib/model/formproperty';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';
import { isNullOrUndefined } from 'util';

export enum DeleteButtonPosition {
  out = 'out',
  in = 'in'
}

@Component({
  selector: 'array-widget',
  templateUrl: './array-widget.component.html',
  styleUrls: ['./array-widget.component.css'],
})
export class ArrayWidgetComponent extends ArrayLayoutWidget implements AfterContentInit, AfterViewChecked {

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

    if (!this.chartloadingService.chartLoadingStatus && !isNullOrUndefined(this.schema.minItems)
    && this.arrayItems < this.schema.minItems) {
      while ( this.arrayItems < this.schema.minItems) { this.addItem(); }
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
    this.formProperty.removeItem(index);
  }

  trackByIndex(index: number, item: any) {
    return item;
  }
}