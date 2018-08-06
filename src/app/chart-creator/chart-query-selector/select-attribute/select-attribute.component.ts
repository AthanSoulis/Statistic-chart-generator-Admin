import { Component, OnInit, Input, Output, EventEmitter, forwardRef, Injectable, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormGroup, ControlContainer, FormGroupDirective, FormBuilder, FormGroupName, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeNodeOutlet } from '@angular/material/tree';

import { FieldType } from '../../../services/supported-filter-types-service/supported-filter-types.service';
import { DbSchemaService, EntityNode, FieldNode, EntityTreeNode } from '../../../services/db-schema-service/db-schema.service';

import { BehaviorSubject, of as observableOf, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorHandlerService } from '../../../services/error-handler-service/error-handler.service';

@Component({
  selector: 'select-attribute',
  templateUrl: './select-attribute.component.html',
  styleUrls: ['./select-attribute.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectAttributeComponent), multi: true }]
})
export class SelectAttributeComponent implements ControlValueAccessor, OnChanges {

  nestedEntityTreeControl: NestedTreeControl<EntityTreeNode>;
  nestedEntityDataSource: MatTreeNestedDataSource<EntityTreeNode>;

  @Input() chosenEntity: string = null;
  @Output() fieldChanged = new EventEmitter<FieldNode>();

  entityTreeNode: EntityTreeNode = null;
  parentPath: string = null;
  selectedField: string = null;
  selectedFieldType: string = null;

  constructor(private formBuilder: FormBuilder,
    private dbSchemaService: DbSchemaService,
    private errorHandlerService: ErrorHandlerService) {

    this.nestedEntityTreeControl = new NestedTreeControl<EntityTreeNode>(this.getChildren);
    this.nestedEntityDataSource = new MatTreeNestedDataSource();
  }

  private getChildren = (node: EntityTreeNode) => {
    if (node.fields !== undefined ) {
      return observableOf(node.relations);
    } else {
      return observableOf(null);
    }}

  hasNestedChild = (_: number, nodeData: EntityTreeNode) => {
    if (nodeData.relations !== undefined && nodeData.fields !== undefined) {
      return (nodeData.relations.length !== 0 || nodeData.fields.length !== 0);
    } else {
      return false; }
    }

  _onChange = (_: any) => {};

  ngOnChanges(changes: SimpleChanges) {

    for (const changedField of Object.keys(changes)) {

      const change = changes[changedField];

      if (changedField === 'chosenEntity') {
        // console.log('Entity changed from: ' + change.previousValue + ' to ' + change.currentValue);
        if (change.currentValue !== change.previousValue) {
          this.getEntityTreeNode(change.currentValue);
        }
      }
    }
  }

  getEntityTreeNode(entity: string) {

    if ( entity === this.chosenEntity) {
      const dbSchemaSubscription = this.dbSchemaService.getEntityFields(this.chosenEntity).subscribe(
        (value: EntityNode) => {
          if (value !== null) {
            const rootTreeNode = this.dbSchemaService.getEntityTree(value);
            if (rootTreeNode !== null) {
              this.entityTreeNode = rootTreeNode;

              const initArray = new Array<EntityTreeNode>();
              if (this.entityTreeNode !== null) {
                initArray.push(this.entityTreeNode);
              }
              this.nestedEntityDataSource.data = initArray;
              this.selectedFieldChanged(null);

              return this.entityTreeNode;
            }
         }},
         error => {
           this.entityTreeNode = null;
           dbSchemaSubscription.unsubscribe();
           return this.entityTreeNode;
         },
         () => dbSchemaSubscription.unsubscribe()
      );
    }
  }

  selectedFieldChanged(value: string) {
    this.selectedField = value;
    this._onChange(this.selectedField);
  }

  // Writes a new value from the form model into the view or (if needed) DOM property.
  writeValue(value: string) {
    // console.log('Writing values: ' + value);
    if (value) {
      this.selectedField = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(_fn: any): void {
    return;
  }

  onExpanded(node: EntityTreeNode) {
    // console.log(node);
    this.parentPath = this.traverseParentPath(node);
  }

  traverseParentPath(node: EntityTreeNode): string {
    if (node.parent === null) {
      return node.name;
    } else {
      return this.traverseParentPath(node.parent) + '.' + node.name;
    }
  }

  nodeSelected(field: FieldNode) {
    this.selectedField = this.parentPath + '.' + field.name;
    this.selectedFieldChanged(this.selectedField);
    // Set the field to full path and emit it
    const selectedFieldNode = new FieldNode();

    selectedFieldNode.name = this.selectedField;
    selectedFieldNode.type = field.type;
    this.fieldChanged.emit(selectedFieldNode);

    // console.log(field.name + ':' + field.type);
  }

}
