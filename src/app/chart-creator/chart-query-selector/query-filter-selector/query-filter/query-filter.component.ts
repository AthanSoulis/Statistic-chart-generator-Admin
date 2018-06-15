import { Component, OnInit, Output, Input, AfterViewInit, EventEmitter, OnDestroy, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormBuilder, FormGroup,
   Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupName, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Filter } from './query-filter.model';
import { SupportedFilterTypesService } from '../../../../supported-filter-types-service/supported-filter-types.service';

declare var jQuery: any;

@Component({
  selector: 'query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class QueryFilterComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() filterFormGroup: FormGroup;
  @Input() chosenEntity: string;
  @Output() deleteFilterEvent = new EventEmitter();

  filterValues: Array<string>;

  operators: string[];

  constructor(private formBuilder: FormBuilder, private operatorsService: SupportedFilterTypesService) {
    this.getOperators();
  }

  get values(): FormArray { return this.filterFormGroup.get('values') as FormArray; }
  get type(): FormControl { return this.filterFormGroup.get('type') as FormControl; }

  getOperators() {
    this.operatorsService.getSupportedFilterTypes().subscribe(
      (data: Array<string>) => this.operators = data // success path
        // error => this.error = error // error path
    );
    return this.operators;
  }

  ngOnInit() {
    console.log(this.filterFormGroup);
    console.log(this.values);
    this.addFilterValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const changedField of Object.keys(changes)) {
      const change = changes[changedField];

      switch (changedField) {

        case 'chosenEntity': {
          // jQuery('.ui.type.dropdown').dropdown('restore default value	');
          // jQuery('.ui.type.dropdown').dropdown('restore default text	');

          break;
        }
        default : {
          break;
        }
      }

    }
  }

  addFilterValue() {
    this.values.push(new FormControl());
  }

  deleteFilterValue(index: number) {
    this.values.removeAt(index);
  }

  ngAfterViewInit(): void {
    jQuery('.ui.type.dropdown').dropdown();
  }

  ngOnDestroy() {
    console.log('Filter Component Destroyed!');
  }
}
