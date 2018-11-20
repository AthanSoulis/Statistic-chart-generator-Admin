import { Component, OnInit, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { Observable } from 'rxjs';

@Component({
  selector: 'tabular-menu-widget',
  templateUrl: './tabular-menu-widget.component.html',
  styleUrls: ['./tabular-menu-widget.component.css'],
})
export class TabularMenuWidgetComponent extends ArrayLayoutWidget implements AfterContentInit {

  editable: boolean[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    super();
   }

  ngAfterContentInit() {
    this.addItem();
  }

  enableEditable(index: number) {
    console.log('Edit enabled', index);
    this.editable[index] = true;
  }
  disableEditable(index: number) {
    console.log('Edit disabled', index);
    this.editable[index] = false;
  }

  get menuArrayLength(): number {
    return (<FormProperty[]>this.formProperty.properties).length;
  }

  getDataSeriesName(index: number): Observable<string> {
    return (<FormProperty>this.formProperty.properties[index])
    .searchProperty(index + '/chartProperties/dataseriesName').valueChanges.asObservable();
  }

  setDataSeriesName(index: number, value: any) {
    (<FormProperty>this.formProperty.properties[index])
    .searchProperty(index + '/chartProperties/dataseriesName').setValue(value, false);
  }

  addItem() {
    if ( (<FormProperty[]>this.formProperty.properties).length < this.schema.maxItems) {
      this.editable.push(false);
      this.formProperty.addItem();
    } else if (this.schema.maxItems === undefined ) {
      this.editable.push(false);
      this.formProperty.addItem();
    }
  }

  removeItem(index: number) {
    if ( this.menuArrayLength > 1 || index > 0) {
      this.formProperty.removeItem(index);
      this.editable.splice(index);
    }
  }

  trackByIndex(index: number, item: any) {
    return item;
  }

}
