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

  constructor(private cdr: ChangeDetectorRef) {
    super();
   }

  ngAfterContentInit() {
    this.addItem();
  }

  get menuArrayLength(): number {
    return (<FormProperty[]>this.formProperty.properties).length;
  }

  getDataSeriesName(index: number): Observable<string> {
    return (<FormProperty>this.formProperty.properties[index])
    .searchProperty(index + '/chartProperties/dataseriesName').valueChanges.asObservable();
  }

  addItem() {
    this.formProperty.addItem();
  }

  removeItem(index: number) {
    if ( this.menuArrayLength > 1 || index > 0) {
      this.formProperty.removeItem(index);
    }
  }

  trackByIndex(index: number, item: any) {
    return item;
  }
}
