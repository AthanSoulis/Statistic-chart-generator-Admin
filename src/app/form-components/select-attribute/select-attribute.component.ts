import { Component, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ControlContainer, FormGroupDirective, FormBuilder, FormGroupName, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeNodeOutlet } from '@angular/material/tree';

import { FieldType } from '../../services/supported-filter-types-service/supported-filter-types.service';
import { DbSchemaService, EntityNode, FieldNode, EntityTreeNode } from '../../services/db-schema-service/db-schema.service';

import { BehaviorSubject, of as observableOf, Observable, Subscription} from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ErrorHandlerService } from '../../services/error-handler-service/error-handler.service';
import { MappingProfilesService, Profile } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';
import { ViewRef_ } from '@angular/core/src/view';

@Component({
  selector: 'select-attribute',
  templateUrl: './select-attribute.component.html',
  styleUrls: ['./select-attribute.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectAttributeComponent), multi: true }]
})
export class SelectAttributeComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {

  nestedEntityTreeControl: NestedTreeControl<EntityTreeNode>;
  nestedEntityDataSource: MatTreeNestedDataSource<EntityTreeNode>;

  @Input() isDisabled = false;
  @Input() formControl: FormControl;
  @Input() chosenEntity: string = null;
  @Output() fieldChanged = new EventEmitter<FieldNode>();

  selectedNode: FieldNode = null;

  constructor(private dbSchemaService: DbSchemaService,
    private errorHandlerService: ErrorHandlerService,
    private profileMappingService: MappingProfilesService,
    private chartLoadingService: ChartLoadingService,
    private cdr: ChangeDetectorRef) {

      this.nestedEntityTreeControl = new NestedTreeControl<EntityTreeNode>(this.getChildren);
      this.nestedEntityDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit() {
    console.log('Select attribute Created');
  }

  ngAfterViewInit() {
    this.registerOnChange(this.handleChange);
    this.registerOnTouched(this.handleTouch);
  }

  ngOnChanges(changes: SimpleChanges) {

    for (const changedField of Object.keys(changes)) {

      const change = changes[changedField];

      if (changedField === 'chosenEntity') {
        // console.log('Entity changed from: ' + change.previousValue + ' to ' + change.currentValue);
        if (change.currentValue !== change.previousValue) {
          if (this.chartLoadingService.chartLoadingStatus) {
            this.getEntityTreeNode(change.currentValue, false);
          } else {
            this.getEntityTreeNode(change.currentValue, true);
          }
        }
      }
    }
  }

  ngOnDestroy() {
    // console.log('Select attribute Destroyed', this.formControl);
  }

  _onChange = (arg: any) => {};
  _onTouched = (arg: boolean) => {};

  handleChange(arg: FieldNode) {
    if (this.checkValidFieldNode(arg) !== null) {
      this.formControl.markAsDirty();
    }
  }

  handleTouch(opened: boolean) {
    if (!opened) {
      this.formControl.markAsTouched();
    }
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

  getEntityTreeNode(entity: string, resetSelectField?: boolean) {

    if (entity === null) {

      this.nestedEntityDataSource.data = [];
      this.selectedFieldChanged(null);
      return;
    }

    if ( entity === this.chosenEntity) {

          const dbSchemaSubscription: Subscription =
          this.dbSchemaService.getEntityFields(this.chosenEntity, this.profileMappingService.selectedProfile$.value)
          .pipe(distinctUntilChanged()).subscribe(
            (value: EntityNode) => {
              if (value !== null) {
                const rootTreeNode: EntityTreeNode = this.dbSchemaService.getEntityTree(value);
                if (rootTreeNode !== null) {
                  const initArray = new Array<EntityTreeNode>();
                  initArray.push(rootTreeNode);
                  this.nestedEntityDataSource.data = initArray;

                  // Expand root node
                  this.nestedEntityTreeControl.expand(rootTreeNode);

                  if (resetSelectField) {
                    this.selectedFieldChanged(null);
                  }
                  return rootTreeNode;
                }
              }},
              error => {
                dbSchemaSubscription.unsubscribe();
                return null;
              },
              () => dbSchemaSubscription.unsubscribe()
          );
    }
  }

  selectedFieldChanged(value: FieldNode) {

    // if (value) {
    //   console.log('Field changed to: ' + (value === null ? null : '{' + value.name + ' , ' + value.type + '}')
    //   + ' from: ' + (this.selectedNode === null ? null : '{' + this.selectedNode.name + ' , ' + this.selectedNode.type + '}'));
    // }

    this.selectedNode = value;
    this._onChange(value);

  }

  trackByFieldName(index: number, item: FieldNode) {
    return item.name;
  }

  // Writes a new value from the form model into the view or (if needed) DOM property.
  writeValue(value: FieldNode) {
    console.log('Updating DOM from model value: ', value);
    if (this.checkValidFieldNode(value)) {
      this.selectedFieldChanged(value);
      if ( this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef_).destroyed ) {
            this.cdr.markForCheck();
      }
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    // console.log('On Change method updated');
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // console.log('On Touched method updated');
    this._onTouched = fn;
  }

  traverseParentPath(node: EntityTreeNode): string {
    if (node.parent === null) {
      return node.name;
    } else {
      return this.traverseParentPath(node.parent) + '.' + node.name;
    }
  }

  nodeSelected(field: FieldNode, node: EntityTreeNode, pathOnly?: boolean) {

    // Set the field to full path, change the control into the updated value and emit it
    const selectedFieldNode = new FieldNode();

    selectedFieldNode.name = this.traverseParentPath(node) + '.' + field.name;
    selectedFieldNode.type = field.type;

    this.formControl.setValue(selectedFieldNode);
    console.log(this.formControl);

    this.fieldChanged.emit(selectedFieldNode);
  }

  public checkValidFieldNode(e: FieldNode) {

    if (e !== null && (e.name && e.type)) {
      return e;
    }
    return null;
  }
}
