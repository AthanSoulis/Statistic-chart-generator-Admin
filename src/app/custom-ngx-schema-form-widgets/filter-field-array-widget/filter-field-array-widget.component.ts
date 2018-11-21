import { Component, AfterContentInit } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'filter-field-array-widget',
  templateUrl: './filter-field-array-widget.component.html',
  styleUrls: ['./filter-field-array-widget.component.css']
})
export class FilterFieldArrayWidgetComponent extends ArrayLayoutWidget implements AfterContentInit {

  operatorSub: Subscription;
  filterOperator: string;

  constructor() {
    super();
   }

   ngAfterContentInit() {

    const dependentOperatorProperty = this.formProperty.searchProperty('type');

    this.operatorSub = dependentOperatorProperty.valueChanges.asObservable().pipe(distinctUntilChanged()).subscribe(
      (operator: string) => {
        this.filterOperator = operator;
        // console.log('Operator: ' + this.filterOperator);
        this.formProperty.reset([], false);
        if (this.filterOperator !== null) {
          this.addFilterValue();
        }
      }
      // error => this.error = error // error path
    );
   }

  get filterFieldArrayLength() {
    return (<FormProperty[]>this.formProperty.properties).length;
  }

  addFilterValue() {

    const addFilter = function (filterOperator) {
      if (!this.filterOperator) { return; }

      this.formProperty.addItem();
      if (this.filterOperator === 'between') {
        this.formProperty.addItem();
      }
    };

    if ( (<FormProperty[]>this.formProperty.properties).length < this.schema.maxItems) {
      addFilter.call(this);
    } else if (this.schema.maxItems === undefined ) {
      addFilter.call(this);
    }

  }

  removeFilterValue(index: number) {
    if (this.filterOperator !== 'between') {
        console.log('Removed index: ' + (<FormProperty>this.formProperty.properties[index]).value);
        this.formProperty.removeItem(index);
    }

    if (this.filterOperator === 'between' && index % 2 === 1 ) {
      console.log('Removed index: ' + (<FormProperty>this.formProperty.properties[index - 1]).value + ' ' +
        (<FormProperty>this.formProperty.properties[index]).value);

      this.formProperty.removeItem(index);
      this.formProperty.removeItem(index - 1 );

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
