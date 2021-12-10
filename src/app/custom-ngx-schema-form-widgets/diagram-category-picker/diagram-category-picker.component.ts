import { UrlProviderService } from './../../services/url-provider-service/url-provider.service';
import { Component, OnDestroy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget, FormProperty, ObjectLayoutWidget } from 'ngx-schema-form';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';
import { FormSchema } from '../../chart-creator/chart-form-schema.model';
import {DynamicFormHandlingService} from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';
import { ISupportedCategory } from '../../services/supported-chart-types-service/supported-chart-types.service';

@Component({
  selector: 'diagram-category-picker',
  templateUrl: './diagram-category-picker.component.html',
  styleUrls: ['./diagram-category-picker.component.scss']
})
export class DiagramCategoryPickerComponent extends ObjectLayoutWidget implements CardPicker, OnDestroy, AfterContentInit {

  // fs: FormSchema;

  get diagramInitialised(): boolean {
    return this.formProperty.value !== null &&
    this.formProperty.value !== undefined &&
    this.formProperty.value !== '';
  }

  subscriptions: Array<Subscription> = [];

  constructor(public diagramCategoryService: DiagramCategoryService, public backEndUrlProvider: UrlProviderService,
              private cdr: ChangeDetectorRef, private tabActivationStatusService: TabActivationStatusService,
              public dynamicFormHandlingService: DynamicFormHandlingService) {
    super();
  }

  ngAfterContentInit() {

    this.subscriptions.push(
      (<BehaviorSubject<ISupportedCategory>> this.formProperty.valueChanges)
      .subscribe(diagram => {
        this.diagramCategoryService.changeDiagramCategory(diagram);

        // Change the requirement of XAxis in order to accomodate the Numbers "chart"
        this.dynamicFormHandlingService.changeRequirementOfXAxis(diagram.type !== 'numbers');
         
        this.cdr.markForCheck();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( suscription => {
        suscription.unsubscribe();
    });
  }

  diagramSelectionAction(diagram: ISupportedCategory) {

    // Changes active tab to the next
    this.tabActivationStatusService.activeId = this.tabActivationStatusService.tabIds[2];

    if ( this.formProperty.value.type != diagram.type || this.formProperty.value.isPolar != diagram.isPolar ) 
      this.formProperty.setValue(diagram, false);
  }

  isDiagramSelected(diagram: ISupportedCategory): boolean 
  {
    if(this.formProperty.value == null)
      return false;

    if(this.formProperty.value.type == diagram.type && this.formProperty.value.isPolar == diagram.isPolar)
      return true;

    return false;
  }

  setSelectedCardStyle(isSelected: boolean) {
    if (isSelected) {
      return {border: 'solid', color: '#2185d0', 'border-radius': '0.5em' };
    }
    return {border: 'none'};
  }
}

export interface CardPicker {

  setSelectedCardStyle(isSelected: boolean): Object;
}
