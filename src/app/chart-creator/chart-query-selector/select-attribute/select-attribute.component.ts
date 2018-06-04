import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ITreeOptions, TREE_ACTIONS, IActionMapping } from 'angular-tree-component';
import { TreeNode } from 'angular-tree-component/dist/defs/api';
import { FormGroup, ControlContainer, FormGroupDirective, FormBuilder, FormGroupName, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FieldTypes } from '../../../supported-filter-types-service/supported-filter-types.service';

@Component({
  selector: 'select-attribute',
  templateUrl: './select-attribute.component.html',
  styleUrls: ['./select-attribute.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectAttributeComponent), multi: true }]
})
export class SelectAttributeComponent implements OnInit, ControlValueAccessor {

  @Input() chosenEntity: string;
  @Input() availableEntityFields: Object;
  @Output() fieldTypeSelected = new EventEmitter<FieldTypes>();

  treeOptions: ITreeOptions = { childrenField: 'relations' };
  fieldsOptions: ITreeOptions = { childrenField: 'fields' };
  treeFields: Array<Object>;

  parentPath: string;
  selectedField: string;
  selectedFieldType: string;

  constructor(private formBuilder: FormBuilder) { }

  _onChange = (_: any) => {};

  ngOnInit() {}

  selectedFieldChanged(value: string) {
    this._onChange(this.selectedField);
  }

  // Writes a new value from the form model into the view or (if needed) DOM property.
  writeValue(value: string) {
    console.log('Writing values: ' + value);
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

  onExpanded(event) {
    console.log(event);
    this.expandNodes(event);
  }

  traverseParentPath(node: TreeNode): string {
    if (node.parent.data.virtual) {
      return this.chosenEntity + '.' + node.data.name;
    } else {
      return this.traverseParentPath(node.parent) + '.' + node.data.name;
    }
  }

  nodeActivated(event) {
    this.treeFields = event.node.data.fields;
    this.parentPath = this.traverseParentPath(event.node);
    console.log(this.parentPath);
  }

  nodeSelected(event) {
    this.selectedField = this.parentPath + '.' + event.node.data.name;
    this._onChange(this.selectedField);
    console.log(this.selectedField + ':' + event.node.data.type);
  }

  expandNodes(event) {
    if (event.isExpanded) {
      this.nodeActivated(event);
    } else {
      this.treeFields = null;
    }
    event.isActive = !event.isActive;
    console.log(this.treeFields);
  }
}
