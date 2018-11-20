import { Component, OnInit, AfterContentInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedFilterTypesService, FilterType, FieldType } from '../../services/supported-filter-types-service/supported-filter-types.service';
import { FieldNode } from '../../services/db-schema-service/db-schema.service';
import { Subscription, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'operator-selection-widget',
  templateUrl: './operator-selection-widget.component.html',
  styleUrls: ['./operator-selection-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatorSelectionWidgetComponent extends ControlWidget implements OnDestroy, AfterContentInit {

  private selectedField: FieldNode = null;
  operators: Observable<Array<FilterType>> = null ;

  private entityFieldSub: Subscription;

  constructor(private operatorsService: SupportedFilterTypesService) {
    super();
   }

  ngAfterContentInit() {

    const dependentProperty = this.formProperty.searchProperty('field');

    this.entityFieldSub = dependentProperty.valueChanges.asObservable().pipe(distinctUntilChanged()).subscribe(
      (field: FieldNode) => { this.fieldChanged(field); }
      // error => this.error = error // error path
    );
  }

  ngOnDestroy() {
    this.entityFieldSub.unsubscribe();
  }

  getOperatorsOfType(type: FieldType): Observable<Array<FilterType>> {
    this.operators =  this.operatorsService.getFiltersOfType(type).pipe(distinctUntilChanged());
    return this.operators;
  }

  fieldChanged(field: FieldNode) {
    if (!field) {
      // Reset the operator
      this.control.setValue(null);
      return;
    }

    if (this.selectedField === null || FieldType[field.type] !== FieldType[this.selectedField.type] ) {

      // console.log('FieldType Changed : ' + FieldType[field.type]);
      // console.log(field);

      this.getOperatorsOfType(FieldType[field.type]);
      this.selectedField = field;
      // Reset the operator
      this.control.setValue(null);

    } else if ( field.name !== this.selectedField.name) {
      this.selectedField = field;
    }
  }

  operatorChanged(operatorValue: string) {

    console.log('Operator Changed: ' + operatorValue);
  }

}
