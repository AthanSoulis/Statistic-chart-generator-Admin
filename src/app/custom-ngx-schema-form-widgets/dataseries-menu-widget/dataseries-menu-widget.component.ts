import { DataseriesTabService } from './dataseries-tab.service';
import { Component, OnInit, AfterContentInit, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { Observable, Subscription, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dataseries-menu-widget',
  templateUrl: './dataseries-menu-widget.component.html',
  styleUrls: ['./dataseries-menu-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataseriesMenuWidgetComponent extends ArrayLayoutWidget implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('dataseriesTabset', {static: false}) dataseriesTabset:NgbTabset;

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
          // this.dataseriesTabService.active = new Array<boolean>(value.length).fill(false);
          // this.dataseriesTabService.active[0] = true;
        }
      }
    ));
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.addItem();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  enableEditable(index: number) {
    console.log('Edit enabled', index);
    this.dataseriesTabService.setEditable(index, true);
    this.cdr.markForCheck();
  }
  disableEditable(index: number) {
    console.log('Edit disabled', index);
    this.dataseriesTabService.setEditable(index, false);
    this.cdr.markForCheck();
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
      
      // Set initial values to the input box
      this.dataseriesTabService.dataseriesTabs.push({active: false, editable: false});
      
      let addedItemId: number = this.menuArrayLength;
      
      const addedItem: FormProperty = this.formProperty.addItem();
      let addedItemDataseriesNameProperty: FormProperty = addedItem.searchProperty(addedItemId+'/chartProperties/dataseriesName');
      
      const addedItemDataseriesName: string = addedItemDataseriesNameProperty.value;
      let newItemName: string = addedItemDataseriesName;

      // Make sure the addedItem name is unique  
      if(this.menuArrayLength > 1)
      {
        const regExpToMatch = new RegExp(addedItemDataseriesName + '(\([1-9]+\))*', 'g');
        let dataseriesNamesProperties: FormProperty[] = 
          this.formProperty.findProperties(addedItemDataseriesNameProperty, this.formProperty.path+'/*/chartProperties/dataseriesName');
        
        const similarNames: string[] = dataseriesNamesProperties
        .map(property => (<string> property.value))
        .filter(name =>(<string> name).match(regExpToMatch));

        let dif = 0;
        while (similarNames.includes(newItemName)) {
          dif++;
          newItemName = addedItemDataseriesName + '(' + dif + ')';
        }
      }
      
      addedItemDataseriesNameProperty.setValue(newItemName, false);
      console.log("Added an Item!");
      
      this.dataseriesTabset.select(newItemName);
      this.cdr.markForCheck();
    }
  }

  removeItem(index: number) {

    if ( this.menuArrayLength <= 1 || index < 0)
      return;

    this.formProperty.removeItem(this.formProperty.properties[index]);
    this.dataseriesTabService.dataseriesTabs.splice(index);

    this.cdr.markForCheck();
  }

  trackByIndex(index: number, item: any) {
    return item;
  }

}
