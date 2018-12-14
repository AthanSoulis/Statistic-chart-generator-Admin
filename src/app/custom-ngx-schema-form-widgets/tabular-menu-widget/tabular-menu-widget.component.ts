import { Component, OnInit, AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { Observable } from 'rxjs';
import { diff } from 'semver';

@Component({
  selector: 'tabular-menu-widget',
  templateUrl: './tabular-menu-widget.component.html',
  styleUrls: ['./tabular-menu-widget.component.css'],
})
export class TabularMenuWidgetComponent extends ArrayLayoutWidget implements AfterContentInit {

  active: boolean[] = [];
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
    const propertyToRename = (<FormProperty>this.formProperty.properties[index])
      .searchProperty(index + '/chartProperties/dataseriesName').setValue(value, true);
  }

  addItem() {
    if ( this.schema.maxItems === undefined || (<FormProperty[]>this.formProperty.properties).length < this.schema.maxItems) {
      const addedItem = this.formProperty.addItem().searchProperty((this.menuArrayLength - 1) + '/chartProperties/dataseriesName');

      // Make sure the addedItem name is unique
      const itemNames: string[]  = [];
      for (let i = 0; i < this.menuArrayLength - 1; i++) {
        itemNames.push((<string>(<FormProperty[]>this.formProperty.properties)[i]
        .searchProperty(i + '/chartProperties/dataseriesName').value));
      }

      const similarItemNames = itemNames.filter(
        itemname => itemname.match(
          new RegExp(addedItem.value + '(\([1-9]+\))*', 'g')));

      let dif = 0;
      let newItemName: string = addedItem.value;
      while (similarItemNames.includes(newItemName)) {
          dif++;
          newItemName = addedItem.value + '(' + dif + ')';
      }
      addedItem.setValue(newItemName, true);

      // Set initial values to the input box
      this.editable.push(false);
      this.active.push(true);
    }
    console.log('Active Tabs:', this.active);
  }

  removeItem(index: number) {
    console.log('Active Tabs:', this.active);
    if ( this.menuArrayLength > 1 || index > 0) {

      const activeIndex = this.active.indexOf(true);
      this.formProperty.removeItem(index);
      this.editable.splice(index);
      this.active.splice(index);

      if (activeIndex > index) {
        this.active[activeIndex - 1] = true;
      }
      this.cdr.detectChanges();
    }
  }

  trackByIndex(index: number, item: any) {
    return item;
  }

}
