import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Filter } from '../../chart-query-selector/query-filter-selector/query-filter/query-filter.model';

@Component({
  selector: 'query-filter-selector',
  templateUrl: './query-filter-selector.component.html',
  styleUrls: ['./query-filter-selector.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class QueryFilterSelectorComponent implements OnInit {

  @Input() chosenEntity: string;
  @Input() availableEntityFields: Array<string>;
  @Input() filters: FormArray;

  constructor(private formBuilder: FormBuilder) {
  }

  addFilter() {
    this.filters.push(this.formBuilder.group({
      field: [null],
      type: [null],
      values: this.formBuilder.array([])
    }));
    console.log('New filter added!');
  }

  removeFilter(index: number) {
    console.log('Removing:');
    console.log(this.filters.at(index));
    this.filters.removeAt(index);
  }

  ngOnInit() {
  }

}
