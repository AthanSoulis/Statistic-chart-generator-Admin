import { Component, OnInit, Output, Input, AfterViewInit, EventEmitter, OnDestroy, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormBuilder, FormGroup,
   Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupName, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Filter } from './query-filter.model';
import { SupportedFilterTypesService, FilterType, FieldType } from '../../../../supported-filter-types-service/supported-filter-types.service';
import { EntityTreeNode } from '../../../../db-schema-service/db-schema.service';

declare var jQuery: any;

@Component({
  selector: 'query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class QueryFilterComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

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
  fieldType: FieldType;

  constructor(private formBuilder: FormBuilder, private operatorsService: SupportedFilterTypesService) {
    console.log('New query filter created !');
    this.getOperators();
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
    console.log(this.filterFormGroup);
    console.log(this.values);
    console.log('Index: ' + this.filterIndex);
    // this.addFilterValue();
  }

  operatorChanged(operatorValue: string) {
    console.log('Operator Changed: ' + operatorValue);
    this.deleteAllFilterValues();
    this.filterOperator = this.operators.find(( element: FilterType) => element.filterOperator === operatorValue);
    if (this.filterOperator) {
      this.addFilterValue();
      if (this.filterOperator.filterName === 'Between') {
        this.addFilterValue();
      }
    }

  }

  fieldTypeChanged(fieldType: FieldType) {
    console.log('FieldType Changed : ' + FieldType[fieldType]);
    if ( fieldType !== this.fieldType ) {
      this.fieldType = fieldType;
      this.getOperatorsOfType(this.fieldType);
      jQuery('#' + this.filterIndex.toString()).dropdown('restore defaults');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const changedField of Object.keys(changes)) {
      const change = changes[changedField];
      if (!change.isFirstChange()) {
        switch (changedField) {

          case 'chosenEntity': {
            console.log('ngOnChanges');
            this.values.reset();

            // jQuery('#' + this.filterIndex.toString()).dropdown('restore default value');
            // Bugged by Semantic UI
            jQuery('#' + this.filterIndex.toString()).dropdown('restore defaults');

            break;
          }
          default : {
            break;
          }
        }
      }
    }
  }

  addFilterValue() {
    this.values.push(new FormControl());
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

  ngAfterViewInit(): void {
    console.log('AfterViewInit');
    jQuery('#' + this.filterIndex.toString()).dropdown();

  }

  ngOnDestroy() {
    console.log('Filter Component Destroyed!');
  }
}
