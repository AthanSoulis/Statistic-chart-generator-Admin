import { Component, OnDestroy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';
import { FormSchema } from '../../chart-creator/chart-form-schema.model';
import {DynamicFormHandlingService} from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';

@Component({
  selector: 'diagram-category-picker',
  templateUrl: './diagram-category-picker.component.html',
  styleUrls: ['./diagram-category-picker.component.css']
})
export class DiagramCategoryPickerComponent extends ControlWidget implements CardPicker, OnDestroy, AfterContentInit {

  // fs: FormSchema;

  get diagramInitialised(): boolean {
    return this.formProperty.value !== null &&
    this.formProperty.value !== undefined &&
    this.formProperty.value !== '';
  }

  subscriptions: Array<Subscription> = [];

  constructor(public diagramCategoryService: DiagramCategoryService,
              private cdr: ChangeDetectorRef, private tabActivationStatusService: TabActivationStatusService,
              public dynamicFormHandlingService: DynamicFormHandlingService) {
    super();
  }

  ngAfterContentInit() {
    this.subscriptions.push(
      (<BehaviorSubject<string>> this.formProperty.valueChanges)
      .subscribe(diagram => {
        this.diagramCategoryService.changeDiagramCategory(diagram);
        this.cdr.markForCheck();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( suscription => {
        suscription.unsubscribe();
    });
  }

  diagramSelectionAction(diagram: string) {

    // Changes active tab to the next
    this.tabActivationStatusService.dataseriesTabStatus = true;

    if ( this.formProperty.value !== diagram ) {
      this.formProperty.setValue(diagram, false);
    }

    if (diagram === 'numbers') {
      this.dynamicFormHandlingService.changeRequirementOfXAxis(false);
    } else {
      this.dynamicFormHandlingService.changeRequirementOfXAxis(true);
    }

  }

  isDiagramSelected(diagram: string): boolean {
    if (diagram === this.formProperty.value) {
      return true;
    }
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
