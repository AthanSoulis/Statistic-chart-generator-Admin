import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { FieldType, FilterType } from '../../services/supported-filter-types-service/supported-filter-types.service';
import { FieldNode } from '../../services/db-schema-service/db-schema.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'filter-field-widget',
  templateUrl: './filter-field-widget.component.html',
  styleUrls: ['./filter-field-widget.component.css']
})
export class FilterFieldWidgetComponent extends ControlWidget implements OnDestroy, AfterContentInit {

  fieldType: FieldType = null;
  selectedField: FieldNode = null;
  filterOperator: string;

  entityFieldSub: Subscription;
  operatorSub: Subscription;

  constructor() {
    super();
  }

  ngAfterContentInit() {
    const parentProperty = this.formProperty.parent;
    const dependentFieldProperty = parentProperty.searchProperty('field');
    const dependentOperatorProperty = parentProperty.searchProperty('type');
    // console.log(dependentProperty);

    this.entityFieldSub = dependentFieldProperty.valueChanges.asObservable().pipe(distinctUntilChanged()).subscribe(
      (field: FieldNode) => {
          if (field) {
            this.selectedField = field;
            this.fieldType = FieldType[field.type];
          }
      }
      // error => this.error = error // error path
    );

    this.operatorSub = dependentOperatorProperty.valueChanges.asObservable().pipe(distinctUntilChanged()).subscribe(
      (operator: string) => this.filterOperator = operator
      // error => this.error = error // error path
    );
  }

  ngOnDestroy() {
    this.entityFieldSub.unsubscribe();
    this.operatorSub.unsubscribe();
  }

  numericChangeHandler(event: any) {
    console.log('Change:', event);
    this.control.setValue(event.target.value);
  }
}
