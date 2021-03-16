import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover.module';
import { Component, OnInit, AfterContentInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { Observable, Subscription, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';

@Component({
  selector: 'dataseries-menu-widget',
  templateUrl: './dataseries-menu-widget.component.html',
  styleUrls: ['./dataseries-menu-widget.component.scss']
})
export class DataseriesMenuWidgetComponent extends ArrayLayoutWidget implements AfterContentInit, OnDestroy {

  active: boolean[] = [];
  editable: boolean[] = [];
  subscriptions: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef, private loadingService: ChartLoadingService) {
    super();
   }

  ngAfterContentInit() {

    this.addItem();

    this.subscriptions.push(this.formProperty.valueChanges.
      pipe(distinctUntilChanged()).subscribe(
      (value: FormProperty[]) => {

        if (value.length === 0) {
          this.active = [true];
        }
        if (this.loadingService.chartLoadingStatus) {
          this.active = new Array<boolean>(value.length);
          this.active[0] = true;
          for (let index = 1; index < this.active.length; index++) {
            this.active[index] = false;
          }
        }
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  onActiveTabChange(value: boolean, index: number) {
    // console.log('[' + index + ']:' + value);
    this.active[index] = value;
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
      addedItem.setValue(newItemName, false);

      // Set initial values to the input box
      this.editable.push(false);
      this.active.push(true);
    }
  }

  removeItem(index: number) {
    if ( this.menuArrayLength > 1 || index > 0) {

      const activeIndex = this.active.indexOf(true);
      this.formProperty.removeItem(this.formProperty.properties[index]);
      this.editable.splice(index);
      this.active.splice(index);

      this.cdr.markForCheck();
    }
  }

  trackByIndex(index: number, item: any) {
    return item;
  }

}
