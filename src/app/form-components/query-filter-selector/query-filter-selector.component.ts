import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Filter } from './query-filter/query-filter.model';
import { EntityTreeNode } from '../../services/db-schema-service/db-schema.service';

@Component({
  selector: 'query-filter-selector',
  templateUrl: './query-filter-selector.component.html',
  styleUrls: ['./query-filter-selector.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class QueryFilterSelectorComponent implements OnInit {

  @Input() chosenEntity: string;
  @Input() entityTreeNode: EntityTreeNode;
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
      console.log('Removing:' + index);
      console.log(this.filters.at(index));
      this.filters.removeAt(index);
  }

  ngOnInit() {
  }

}
