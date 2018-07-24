import { Component, OnInit, Output, Input, AfterViewInit, EventEmitter, OnDestroy, forwardRef, OnChanges, SimpleChanges, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormBuilder, FormGroup,
   Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupName, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Filter } from './query-filter.model';
import { SupportedFilterTypesService, FilterType, FieldType } from '../../../../services/supported-filter-types-service/supported-filter-types.service';
import { EntityTreeNode, FieldNode } from '../../../../services/db-schema-service/db-schema.service';

import { Observable, of, fromEvent } from 'rxjs';
import { FieldAutocompleteService, AutocompleteResponse } from '../../../../services/field-autocomplete-service/field-autocomplete.service';

declare var jQuery: any;

@Component({
  selector: 'query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class QueryFilterComponent implements OnInit, OnDestroy, OnChanges {

  // Reference to the parent FormGroup
  @Input() filterFormGroup: FormGroup;
  // The selected entity
  @Input() chosenEntity: string;
  // The root node for the entity tree
  @Input() entityTreeNode: EntityTreeNode;
  // The index of the current filter component
  @Input() filterIndex: number;
  // Event emitter for the deletion of this filter
  @Output() deleteFilterEvent = new EventEmitter();

  operators: Array<FilterType>;
  filterOperator: FilterType;
  selectedField: FieldNode = null;
  fieldType: FieldType = null;

  constructor(private formBuilder: FormBuilder, private operatorsService: SupportedFilterTypesService,
    private fieldAutocompleteService: FieldAutocompleteService) {

    console.log('New query filter created !');
    // this.getOperators();
  }

  get values(): FormArray { return this.filterFormGroup.get('values') as FormArray; }
  get type(): FormControl { return this.filterFormGroup.get('type') as FormControl; }

  getOperators() {
    this.operatorsService.getSupportedFilterTypes().subscribe(
      (data: Array<FilterType>) => this.operators = data // success path
        // error => this.error = error // error path
    );
    return this.operators;
  }
  getOperatorsOfType(type: FieldType) {
    this.operatorsService.getFiltersOfType(type).subscribe(
      (data: Array<FilterType>) => this.operators = data // success path
        // error => this.error = error // error path
    );
    return this.operators;
  }

  ngOnInit() {
    console.log('Filter Created : ' + this.filterIndex);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const changedField of Object.keys(changes)) {
      const change = changes[changedField];

      if (!change.isFirstChange()) {
        switch (changedField) {

          case 'chosenEntity':
            console.log('ngOnChanges: chosenEntity');
            this.values.reset();
            this.type.reset();
            this.deleteAllFilterValues();
            this.selectedField = null;
            this.operators = null;

            break;

          default :
            break;
      }}
    }
  }

  fieldChanged(field: FieldNode) {

    const newfieldType = FieldType[field.type];

    if (this.selectedField === null || field.name !== this.selectedField.name) {
      this.selectedField = field;
    }

    if ( newfieldType !== this.fieldType ) {
      this.fieldType = newfieldType;
      console.log('FieldType Changed : ' + FieldType[newfieldType]);
      this.getOperatorsOfType(this.fieldType);
    }
  }

  operatorChanged(operatorValue: string) {

    console.log('Operator Changed: ' + operatorValue);
    this.deleteAllFilterValues();
    this.filterOperator = this.operators.find(( element: FilterType) => element.filterOperator === operatorValue);
    this.addFilterValue();
  }

  addFilterValue() {
    if (!this.filterOperator) { return; }

    this.values.push(new FormControl());
    if (this.filterOperator.filterName === 'Between') {
      this.values.push(new FormControl());
    }
  }

  applicableDivider(index: number) {
    if (!this.filterOperator) { return false; }

    if ( index !== this.values.controls.length - 1) {
      if (this.filterOperator.filterName === 'Between') {
        return index % 2 !== 0;
      }
      return true;
    }
  }

  deleteFilterValue(index: number) {
    if (this.filterOperator.filterName !== 'Between' || index !== 1 ) {
      if (index !== 0 ) {
        this.values.removeAt(index);
      }}
  }

  deleteAllFilterValues() {
    while (this.values.length) {
      this.values.removeAt(0);
    }
  }

  ngOnDestroy() {
    console.log('Filter Destroyed : ' + this.filterIndex);
  }
}
