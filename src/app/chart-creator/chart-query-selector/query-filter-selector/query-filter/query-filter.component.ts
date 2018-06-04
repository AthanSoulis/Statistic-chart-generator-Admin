import { Component, OnInit, Output, Input, AfterViewInit, EventEmitter, OnDestroy, forwardRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormBuilder, FormGroup,
   Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupName, FormArray, AbstractControl } from '@angular/forms';
import { Filter } from './query-filter.model';
import { SupportedFilterTypesService } from '../../../../supported-filter-types-service/supported-filter-types.service';

declare var jQuery: any;

@Component({
  selector: 'query-filter',
  templateUrl: './query-filter.component.html',
  styleUrls: ['./query-filter.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class QueryFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() filterFormGroup: FormGroup;
  @Input() chosenEntity: string;
  @Input() availableEntityFields: Array<string>;
  @Output() deleteFilterEvent = new EventEmitter();

  operators: string[];

  constructor(private formBuilder: FormBuilder, private operatorsService: SupportedFilterTypesService) {
    this.getOperators();
  }

  getOperators() {
    this.operatorsService.getSupportedFilterTypes().subscribe(
      (data: Array<string>) => this.operators = data // success path
        // error => this.error = error // error path
    );
    return this.operators;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    jQuery('.ui.dropdown').dropdown();
  }

  ngOnDestroy() {
    console.log('Filter Component Destroyed!');
  }
}
