import { DataseriesFormSchema } from './../../chart-creator/chart-form-schema.classes';
import { Component, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { ArrayLayoutWidget } from 'ngx-schema-form';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';
import { NgbNav, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dataseries-menu-widget',
  templateUrl: './dataseries-menu-widget.component.html',
  styleUrls: ['./dataseries-menu-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataseriesMenuWidgetComponent extends ArrayLayoutWidget implements AfterViewInit, OnDestroy {

  @ViewChild('nav', {static: false}) dataseriesMenu:NgbNav;
  
  @ViewChild('editDataseriesName') set userContent(element: ElementRef)
  {
    // Here we get access only when element is rendered
    if (element)
      (element.nativeElement as HTMLElement).getElementsByTagName("input")[0].focus();
  }

  subscriptions: Subscription[] = [];
  public editableName: NgbNavItem | null = null;

  constructor(private cdr: ChangeDetectorRef, private loadingService: ChartLoadingService) { super(); }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.addItem();

    this.subscriptions.push(this.formProperty.valueChanges.
      pipe(distinctUntilChanged(this.compareDataseriesSchema)).subscribe(
      (value: DataseriesFormSchema[]) => {
        
        // After a chart load make the last Dataseries active.
        if (this.loadingService.chartLoadingStatus) {
          this.dataseriesMenu.activeId = value.length - 1;
          this.cdr.markForCheck();
          return;
        }

        if(value.length > 1)
          return;
        
        // When there is one Dataseries make sure the dataseries menu is active on it.
        this.dataseriesMenu.activeId = value.length - 1;
        this.cdr.markForCheck();
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  enableEditable(index: number) {
    this.editableName = this.dataseriesMenu.items.get(index);
    this.cdr.markForCheck();
    console.log('Edit enabled', index);
  }
  disableEditable(index: number) {
    this.editableName = null;
    this.cdr.markForCheck();
    console.log('Edit disabled', index);
  }

  isEditableName(index: number) : boolean
  {
    return this.editableName !== null && this.editableName.id == index;
  }

  getDataSeriesName(index: number): Observable<string> | null{
    
    let property = (<FormProperty>this.formProperty.properties[index]);
    if(property != null)
      return property.searchProperty(index + '/chartProperties/dataseriesName').valueChanges.asObservable();
    
    return null;
  }

  setDataSeriesName(index: number, event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    
    (<FormProperty>this.formProperty.properties[index])
      .searchProperty(index + '/chartProperties/dataseriesName').setValue(value, false);
  }

  addItem() {
    if ( this.schema.maxItems === undefined || (<FormProperty[]>this.formProperty.properties).length < this.schema.maxItems) {
      
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
      
      this.dataseriesMenu.select(addedItemId);
      this.cdr.markForCheck();
    }
  }

  removeItem(index: number, $event: Event) {

    if ( this.menuArrayLength <= 1 || index < 0)
      return;

    var newActiveId = this.dataseriesMenu.activeId-1 < 0 ? 0 : this.dataseriesMenu.activeId-1 ;
      
    this.formProperty.removeItem(this.formProperty.properties[index]);
    // The $event.preventDefault() is a workaround to stop web-app reloading
    // https://github.com/ng-bootstrap/ng-bootstrap/issues/1909 
    $event.preventDefault();
    $event.stopImmediatePropagation();

    this.cdr.markForCheck();
    this.dataseriesMenu.select(newActiveId);
  }

  trackByIndex(index: number, item: any) {
    return item;
  }

  public changeOnEnter(event: Event, index: number)
  {   
    if (event.defaultPrevented) // Do nothing if the event was already processed
      return; 
    
    if(this.editableName.id === index)
    {
      event.target.dispatchEvent(new Event("change"));
      event.target.dispatchEvent(new Event("blur"));
    }

    event.preventDefault(); // Mark that it has already been processed
  }

  get menuArrayLength(): number {
    return (<FormProperty[]>this.formProperty.properties).length;
  }

  private compareDataseriesSchema(prev: DataseriesFormSchema[], curr: DataseriesFormSchema[])
  {
    if(prev.length !== curr.length)
      return false;
    for (let i = 0; i < prev.length; i++)
    {
      if(prev[i] !== curr[i])
        return false;
      
      if(prev[i].data !== curr[i].data)
        return false;
      if(prev[i].chartProperties !== curr[i].chartProperties)
        return false;
    }
    return true;
  }

}
