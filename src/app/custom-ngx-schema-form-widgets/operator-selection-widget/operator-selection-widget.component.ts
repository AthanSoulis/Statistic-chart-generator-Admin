import { Component, OnInit, AfterContentInit, OnDestroy, Input } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedFilterTypesService, FilterType, FieldType } from '../../services/supported-filter-types-service/supported-filter-types.service';
import { FieldNode } from '../../services/db-schema-service/db-schema.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'operator-selection-widget',
  templateUrl: './operator-selection-widget.component.html',
  styleUrls: ['./operator-selection-widget.component.css']
})
export class OperatorSelectionWidgetComponent extends ControlWidget implements OnDestroy, AfterContentInit {
  @Input() fieldType: string;

  private selectedField: FieldNode = null;
  operators: Array<FilterType> = null ;

  private entityFieldSub: Subscription;

  constructor(private operatorsService: SupportedFilterTypesService) {
    super();
   }

  ngAfterContentInit() {

    const dependentProperty = this.formProperty.searchProperty('field');
    console.log(dependentProperty);

    this.entityFieldSub = dependentProperty.valueChanges.asObservable().subscribe(
      (field: FieldNode) => this.fieldChanged(field)
      // error => this.error = error // error path
    );
  }

  ngOnDestroy() {
    this.entityFieldSub.unsubscribe();
  }

  getOperatorsOfType(type: FieldType) {
    const sub: Subscription = this.operatorsService.getFiltersOfType(type).subscribe(
      (data: Array<FilterType>) => this.operators = data, // success path
      // error => sub.unsubscribe // error path
      () => sub.unsubscribe
    );
  }

  fieldChanged(field: FieldNode) {
    if (!field) { return; }

    if (this.selectedField === null || FieldType[field.type] !== FieldType[this.selectedField.type] ) {

      console.log('FieldType Changed : ' + FieldType[field.type]);
      console.log(field);
      this.getOperatorsOfType(FieldType[field.type]);
      this.selectedField = field;
      // Reset the operator
      this.control.setValue('');

    } else if ( field.name !== this.selectedField.name) {
      this.selectedField = field;
    }
  }

  operatorChanged(operatorValue: string) {

    console.log('Operator Changed: ' + operatorValue);
  }

}
