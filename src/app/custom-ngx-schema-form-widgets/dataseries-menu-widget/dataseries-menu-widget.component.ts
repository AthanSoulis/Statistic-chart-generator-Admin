import { DataseriesTabService } from './dataseries-tab.service';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover.module';
import { Component, OnInit, AfterContentInit, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { Observable, Subscription, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dataseries-menu-widget',
  templateUrl: './dataseries-menu-widget.component.html',
  styleUrls: ['./dataseries-menu-widget.component.scss']
})
export class DataseriesMenuWidgetComponent extends ArrayLayoutWidget implements AfterContentInit, OnDestroy, OnInit {

  @ViewChild('dataseriesTabset') dataseriesTabset:NgbTabset;

  subscriptions: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef, private loadingService: ChartLoadingService, protected dataseriesTabService: DataseriesTabService) 
  {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(this.formProperty.valueChanges.
      pipe(distinctUntilChanged()).subscribe(
      (value: FormProperty[]) => {

        if (this.loadingService.chartLoadingStatus) {
          this.dataseriesTabService.active = new Array<boolean>(value.length).fill(false);
          this.dataseriesTabService.active[0] = true;
        }
      }
    ));
  }

  ngAfterContentInit() {
    // this.addItem();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  enableEditable(index: number) {
    console.log('Edit enabled', index);
    this.dataseriesTabService.editable[index] = true;
  }
  disableEditable(index: number) {
    console.log('Edit disabled', index);
    this.dataseriesTabService.editable[index] = false;
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
      let addedItemId: number = this.menuArrayLength-1;
      const addedItem = this.formProperty.addItem().searchProperty(addedItemId + '/chartProperties/dataseriesName');
      
      // Make sure the addedItem name is unique
      let dif = 0;
      const regExpToMatch = new RegExp(addedItem.value + '(\([1-9]+\))*', 'g');
      let newItemName: string = addedItem.value;
      (<FormProperty[]>this.formProperty.properties).forEach(property => {
        let dataseriesName: string = property.searchProperty('*/chartProperties/dataseriesName').value
        if(dataseriesName.match(regExpToMatch))
        {
          dif++;
          newItemName = addedItem.value + '(' + dif + ')';
        }
      });
      // for (let i = 0; i < this.menuArrayLength - 1; i++) {
      //   let dataseriesName: string = (<string>(<FormProperty[]>this.formProperty.properties)[i].searchProperty(i + '/chartProperties/dataseriesName').value);
      //   if(dataseriesName.match(regExpToMatch))
      //   {
      //     dif++;
      //     newItemName = addedItem.value + '(' + dif + ')';
      //   }
      // }
      addedItem.setValue(newItemName, false);

      // Set initial values to the input box
      this.dataseriesTabService.editable.push(false);
      this.dataseriesTabService.active.push(true);
      this.dataseriesTabService.dataseriesTabIds.push(addedItemId.toString())
      this.dataseriesTabset.select(this.dataseriesTabService.dataseriesTabIds[addedItemId.toString()]);
      console.log("Added an Item!");
    }
  }

  removeItem(index: number) {
    if ( this.menuArrayLength > 1 || index > 0) {

      const activeIndex = this.dataseriesTabService.active.indexOf(true);
      this.formProperty.removeItem(this.formProperty.properties[index]);
      this.dataseriesTabService.editable.splice(index);
      this.dataseriesTabService.active.splice(index);

      this.dataseriesTabset.select(this.dataseriesTabService.dataseriesTabIds[index-1]);

      this.cdr.markForCheck();
    }
  }

  trackByIndex(index: number, item: any) {
    return item;
  }

}
