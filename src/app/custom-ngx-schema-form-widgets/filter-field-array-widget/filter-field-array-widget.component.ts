import { Component, AfterContentInit } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';

@Component({
  selector: 'filter-field-array-widget',
  templateUrl: './filter-field-array-widget.component.html',
  styleUrls: ['./filter-field-array-widget.component.scss']
})
export class FilterFieldArrayWidgetComponent extends ArrayLayoutWidget implements AfterContentInit {

  operatorSub: Subscription|null = null;
  filterOperator: string|null = null;

  constructor(private chartLoadingService: ChartLoadingService) {
    super();
   }

   ngAfterContentInit() {

    const dependentOperatorProperty = this.formProperty.searchProperty('type');

    this.operatorSub = dependentOperatorProperty.valueChanges.asObservable().pipe(distinctUntilChanged()).subscribe(
      (operator: string) => {
        this.filterOperator = operator;

        // We want to avoid certain functionality when a chart is Loading
        // so notify that this Dataseries is loading
        if (this.chartLoadingService.chartLoadingStatus) {
          this.chartLoadingService.increaseLoadingObs();
        }

        if (!this.chartLoadingService.chartLoadingStatus && this.filterOperator !== null) {
          this.formProperty.reset([], false);
          this.addFilterValue();
        }

        // We want to avoid certain functionality when a chart is Loading
        // so notify that this Dataseries stopped loading
        if ( this.chartLoadingService.chartLoadingStatus) {
          this.chartLoadingService.decreaseLoadingObs();
        }
      }
      // error => this.error = error // error path
    );
   }

  get filterFieldArrayLength() {
    return (<FormProperty[]>this.formProperty.properties).length;
  }

  addFilterValue() {

    if ( (<FormProperty[]>this.formProperty.properties).length < this.schema.maxItems) {
      this.addFilter.call(this);
    } else if (this.schema.maxItems === undefined ) {
      this.addFilter.call(this);
    }
  }
  
  private addFilter = () => {
    if (!this.filterOperator) { return; }

    this.formProperty.addItem();
    if (this.filterOperator === 'between') {
      this.formProperty.addItem();
    }
  };
  removeFilterValue(index: number) {
    if (this.filterOperator !== 'between') {
        console.log('Removed index: ' + (<FormProperty>this.formProperty.properties[index]).value);
        this.formProperty.removeItem(this.formProperty.properties[index]);
    }

    if (this.filterOperator === 'between' && index % 2 === 1 ) {
      console.log('Removed index: ' + (<FormProperty>this.formProperty.properties[index - 1]).value + ' ' +
        (<FormProperty>this.formProperty.properties[index]).value);

      this.formProperty.removeItem(this.formProperty.properties[index]);
      this.formProperty.removeItem(this.formProperty.properties[index - 1]);

    }
  }

  trackByIndex(index: number, item: any) {
    return item;
  }

  applicableDivider(index: number) {
    if (!this.filterOperator) { return false; }

    if ( index !== (<FormProperty[]>this.formProperty.properties).length - 1) {
      if (this.filterOperator === 'between') {
        return index % 2 !== 0;
      }
      return true;
    }
  }
}
