import { UrlProviderService } from './../../services/url-provider-service/url-provider.service';
import { DynamicDataSource, DynamicTreeDatabase } from './dynamic-entity-tree/dynamic-entity-tree';
import { EntityTreeNode, FieldNode, EntityNode, DynamicEntityNode } from './dynamic-entity-tree/entity-tree-nodes.types';
import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, forwardRef, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef, ViewRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { of as observableOf} from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { MappingProfilesService} from '../../services/mapping-profiles-service/mapping-profiles.service';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';

@Component({
  selector: 'select-attribute',
  templateUrl: './select-attribute.component.html',
  styleUrls: ['./select-attribute.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectAttributeComponent), multi: true }]
})
export class SelectAttributeComponent implements ControlValueAccessor, OnChanges, AfterViewInit {

  // nestedEntityTreeControl: NestedTreeControl<EntityTreeNode>;
  // nestedEntityDataSource: MatTreeNestedDataSource<EntityTreeNode>;
  nestedEntityTreeControl: NestedTreeControl<DynamicEntityNode>;
  nestedEntityDataSource: DynamicDataSource;

  @Input() isDisabled = false;
  @Input() formControl: FormControl;
  @Input() chosenEntity: string = null;
  @Output() fieldChanged = new EventEmitter<FieldNode>();
 
  selectedNode: FieldNode = null;
  private dynamicTreeDB: DynamicTreeDatabase

  constructor(private profileMappingService: MappingProfilesService,
    private chartLoadingService: ChartLoadingService,
    private cdr: ChangeDetectorRef,
    // These services are just for the DynamicTreeDatabase
    private httpClient: HttpClient,
    private urlProvider: UrlProviderService
    ) {
      this.dynamicTreeDB = new DynamicTreeDatabase(httpClient, urlProvider, profileMappingService);

      // this.nestedEntityTreeControl = new NestedTreeControl<EntityTreeNode>(this.getChildren);
      // this.nestedEntityDataSource = new MatTreeNestedDataSource<EntityTreeNode>();
      this.nestedEntityTreeControl = new NestedTreeControl<DynamicEntityNode>(node => node.relations);
      this.nestedEntityDataSource = new DynamicDataSource(this.nestedEntityTreeControl, this.dynamicTreeDB);      
  }
/**
 * Angular callbacks
 */

  ngAfterViewInit() {
    this.registerOnChange(this.handleChange);
    this.registerOnTouched(this.handleTouch);
  }

  ngOnChanges(changes: SimpleChanges) {

    const change = changes['chosenEntity'];

    if(change === null || change === undefined)
      return;
    if(change.currentValue == change.previousValue)
      return;

    console.log("Changed to "+change.currentValue);
    
    
    if (this.chartLoadingService.chartLoadingStatus) {
      this.getEntityTreeNode(change.currentValue, false);
    } else {
      this.getEntityTreeNode(change.currentValue, true);
    }
  }

/**
 * Mat Nested Tree related calls
 */

  private getChildren = (node: EntityTreeNode) =>
  {
    if (node.relations !== undefined )
      return observableOf(node.relations);
    return observableOf(null);
  }

  // hasNestedChild = (_number: number, nodeData: EntityTreeNode) => {
  //   if (nodeData.relations !== undefined && nodeData.fields !== undefined)
  //     return (nodeData.relations.length !== 0 || nodeData.fields.length !== 0);

  //   return false;
  // }
  
  hasNestedChild = (_: number, node: DynamicEntityNode) => !!node.fields || node.isExpandable;

  getEntityTreeNode(entity: string, resetSelectField?: boolean) {

    if (entity === null || entity === undefined) {

      this.nestedEntityDataSource.data = [];
      this.dynamicTreeDB.initialData.next([]);
      this.selectedFieldChanged(null);
      return;
    }

    if ( entity !== this.chosenEntity)
      return;
      
    console.log("Getting Entity fields for :" + this.chosenEntity);

    // Cache the EntityTree
    this.dynamicTreeDB.initCache(this.chosenEntity);

    // Expand the first tree node and reset the field if it is needed
    this.dynamicTreeDB.initialData.pipe(takeWhile(() => this.chosenEntity == entity))
    .subscribe((initData : DynamicEntityNode[]) => {
      
      // Initialise the NestedTree's data
      this.nestedEntityDataSource.data = initData;
      
      if(initData.length > 0)
        this.nestedEntityTreeControl.expand(initData[0]);

      if (resetSelectField)
        this.selectedFieldChanged(null);

    });

    // const dbSchemaSubscription: Subscription =
    // this.dbSchemaService.getEntityFields(this.chosenEntity, this.profileMappingService.activeProfile)
    // .pipe(distinctUntilChanged(this.compareEntityNodes),first()).subscribe(
    //   (value: EntityNode) => {
    //       if(value === null || value === undefined)
    //         return;

    //       console.log("EntityNode", value);
          
    //       const rootTreeNode: EntityTreeNode = this.dbSchemaService.getEntityTree(value);

    //       if (rootTreeNode === null)
    //         return;

    //       // console.log("EntityTreeNode", rootTreeNode);
          
    //       const initArray = new Array<EntityTreeNode>();
    //       initArray.push(rootTreeNode);
    //       this.nestedEntityDataSource.data = initArray;

    //       // console.log("NestedEntityDataSource", this.nestedEntityDataSource);
    //       // Expand root node
    //       this.nestedEntityTreeControl.expand(rootTreeNode);

    //       if (resetSelectField)
    //         this.selectedFieldChanged(null);
    //     }
    // );
  }

  // nodeSelected(field: FieldNode, node: EntityTreeNode, pathOnly?: boolean) {

  //   // Set the field to full path
  //   const selectedFieldNode = new FieldNode();
  //   selectedFieldNode.name = this.traverseParentPath(node) + '.' + field.name;
  //   selectedFieldNode.type = field.type;

  //   // Change the control into the updated value
  //   this.formControl.setValue(selectedFieldNode);
  //   console.log(this.formControl);

  //   // Emit the event that the field value has changed
  //   this.fieldChanged.emit(selectedFieldNode);
  // }
  nodeSelected(field: FieldNode, node: DynamicEntityNode, pathOnly?: boolean) {

    const selectedFieldNode = new FieldNode();

    // Set the field to full path
    selectedFieldNode.name = this.takeFieldName(field, node);
    // selectedFieldNode.name = this.traverseParentPath(node) + '.' + field.name;
    selectedFieldNode.type = field.type;

    // Change the control into the updated value
    this.formControl.setValue(selectedFieldNode);
    console.log(this.formControl);

    // Emit the event that the field value has changed
    this.fieldChanged.emit(selectedFieldNode);
  }

/**
 * Utility calls
 */
  takeFieldName(field: FieldNode, node: DynamicEntityNode) : string
  {
    var parentPath = '';
    node.path.map((nodeName: string) => {
      if(parentPath.length > 0)
        parentPath = parentPath + '.' + nodeName;
      else
        parentPath = nodeName;
    });
    return parentPath + '.' + field.name;;
  }
  trackByFieldName(index: number, item: FieldNode) { return item.name; }

  public checkValidFieldNode(e: FieldNode) {

    if (e !== null && (e.name && e.type)) return e;

    return null;
  }

  traverseParentPath(node: EntityTreeNode): string {
    if (node.parent === null)
      return node.name;

    return this.traverseParentPath(node.parent) + '.' + node.name;
  }

  // Method checking if two Nodes are the same
  compareEntityNodes(prev: EntityNode, curr: EntityNode) : boolean
  {
    if(prev == null && curr == null) return true;

    if(prev.name !== curr.name) return false;
    if(prev.relations.length != curr.relations.length) return false;

    for (let index = 0; index < prev.relations.length; index++)
    {
      if(prev.relations[index].name !== curr.relations[index].name)
        return false;
    }

    if(prev.fields.length != curr.fields.length) return false;
    
    for (let index = 0; index < prev.fields.length; index++)
    {
      if(prev.fields[index].name !== curr.fields[index].name)
        return false;
    }
    
    return true;
  }
/**
 * Value Accessor related calls
 */

  _onChange = (arg: any) => {};
  _onTouched = (arg: boolean) => {}; 

  handleChange(arg: FieldNode) { if (this.checkValidFieldNode(arg) !== null) this.formControl.markAsDirty(); }
  handleTouch(opened: boolean) { if (!opened) this.formControl.markAsTouched(); }

  registerOnChange(fn: (_: any) => void): void { /* console.log('On Change method updated');*/ this._onChange = fn; }
  registerOnTouched(fn: any): void { /* console.log('On Touched method updated'); */ this._onTouched = fn; }

  // Writes a new value from the form model into the view or (if needed) DOM property.
  writeValue(value: FieldNode) {

    if (this.checkValidFieldNode(value)) 
    {
      this.selectedFieldChanged(value);
      if ( this.cdr !== null && this.cdr !== undefined && !(this.cdr as ViewRef).destroyed )
        this.cdr.markForCheck();
    }
    // console.log('Updated DOM from model value: ', value);
  }

  // Method that calls the registered onChange method
  selectedFieldChanged(value: FieldNode) {

    this.selectedNode = value;
    this._onChange(value);

    // console.log('Field changed to: %s from: %s',
    //  (value === null ? null : '{' + value.name + ' , ' + value.type + '}'),
    //  (this.selectedNode === null ? null : '{' + this.selectedNode.name + ' , ' + this.selectedNode.type + '}'));

  }
}