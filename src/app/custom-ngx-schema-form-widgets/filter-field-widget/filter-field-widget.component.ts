import { Subscription } from 'rxjs';
import { Component, OnDestroy, AfterContentInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { FieldType} from '../../services/supported-filter-types-service/supported-filter-types.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { FieldNode } from '../../form-components/select-attribute/dynamic-entity-tree/entity-tree-nodes.types';

@Component({
  selector: 'filter-field-widget',
  templateUrl: './filter-field-widget.component.html',
  styleUrls: ['./filter-field-widget.component.scss']
})
export class FilterFieldWidgetComponent extends ControlWidget implements OnDestroy, AfterContentInit {

  fieldType: FieldType|null = null;
  selectedField: FieldNode|null = null;
  filterOperator: string|null = null;

  entityFieldSub: Subscription|null = null;
  operatorSub: Subscription|null = null;

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
    if(this.entityFieldSub !== null)
      this.entityFieldSub.unsubscribe();
    
      if(this.operatorSub !== null)
      this.operatorSub.unsubscribe();
  }

  numericChangeHandler(event: any) {
    // console.log('NumbericChangeHandler Input:', event);
    this.control.setValue(event.target.value);
  }
}
