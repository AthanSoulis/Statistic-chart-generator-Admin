import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DbSchemaService, EntityTreeNode, EntityNode } from '../../db-schema-service/db-schema.service';
import { Query, Select } from './chart-query.model';
import { SupportedAggregateFunctionsService } from '../../supported-aggregate-functions-service/supported-aggregate-functions.service';

declare var jQuery: any;

@Component({
  selector: 'chart-query-selector',
  templateUrl: './chart-query-selector.component.html',
  styleUrls: ['./chart-query-selector.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class ChartQuerySelectorComponent implements OnInit, AfterViewInit {

  @Input() queryForm: FormGroup;
  // @Input() chartForm: FormGroup;

  chosenEntity: string = null;
  entityTreeRoot: EntityTreeNode = null;

  availableEntities: Array<string>;
  availableAggregates: Array<string>;
  availableEntityFields: Object[];

  constructor(private formBuilder: FormBuilder,
    private dbSchemaService: DbSchemaService,
    private supportedAggregateFunctionsService: SupportedAggregateFunctionsService) {

      this.getAvailableEntities();
      this.getAvailableAggregates();
  }

  ngOnInit() {}

  getAvailableEntities() {
    this.dbSchemaService.getAvailableEntities().subscribe(
      (data: Array<string>) => this.availableEntities = data // success path
        // error => this.error = error // error path
    );
    return this.availableEntities;
  }

  getAvailableAggregates() {
    this.supportedAggregateFunctionsService.getSupportedAggregateFunctionFilterY().subscribe(
      (data: Array<string>) => this.availableAggregates = data // success path
        // error => this.error = error // error path
    );
    return this.availableAggregates;
  }

  getAvailableEntityFields(entity: string) {
    if (entity === this.chosenEntity) {
      this.dbSchemaService.getEntityFields(entity).subscribe(
        (data: any) => {this.availableEntityFields = data.relations; } // success path
          // error => this.error = error // error path
      );
    }
    return this.availableEntityFields;
  }

  getEntityTreeNode(entity: string) {
    if (entity === this.chosenEntity) {
      this.dbSchemaService.getEntityFields(this.chosenEntity).subscribe(
        (value: EntityNode) => {
          if (value !== null) {
            this.dbSchemaService.getEntityTree(value)
            .subscribe(
              (rootTreeNode: EntityTreeNode) => {
                if (rootTreeNode !== null) {
                  this.entityTreeRoot = rootTreeNode;
                  return this.entityTreeRoot;
                 }});
         }}
      );
    }
    this.entityTreeRoot = null;
    return this.entityTreeRoot;
  }

  entityChanged(entity: string) {
    this.chosenEntity = entity;
    // this.getAvailableEntityFields(entity);
    this.getEntityTreeNode(entity);

    this.selectXs.reset();
    this.selectY.reset();
    this.filters.reset();
    jQuery('.ui.aggregate.dropdown').dropdown('restore defaults');
  }

  totalAggregateEnabled() {
    return this.YaxisAggregate !== null && this.YaxisAggregate.value === 'total';
  }

  get entity(): FormControl { return this.queryForm.get('entity') as FormControl; }
  get selectY(): FormGroup { return this.queryForm.get('selectY') as FormGroup; }
  get selectXs(): FormArray { return this.queryForm.get('selectXs') as FormArray; }
  get filters(): FormArray { return this.queryForm.get('filters') as FormArray; }

  get YaxisAggregate(): FormControl { return this.selectY.get('aggregate') as FormControl; }

  onSubmit(value: string): void {
    console.log('you submitted value: ', value);
  }

  ngAfterViewInit(): void {
    jQuery('.ui.entity.dropdown').dropdown();
    jQuery('.ui.aggregate.dropdown').dropdown();
  }
}
