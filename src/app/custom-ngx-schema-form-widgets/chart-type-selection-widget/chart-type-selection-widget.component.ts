import { Component, AfterContentInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedChartTypesService, ISupportedChart } from '../../services/supported-chart-types-service/supported-chart-types.service';
import {  BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'chart-type-selection-widget',
  templateUrl: './chart-type-selection-widget.component.html',
  styleUrls: ['./chart-type-selection-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartTypeSelectionWidgetComponent extends ControlWidget implements AfterContentInit, OnDestroy {

  supportedChartTypes: Array<string>;
  public isVisible: BehaviorSubject<boolean>;
  private sub: Subscription;

  constructor(private chartTypesService: SupportedChartTypesService, private cdr: ChangeDetectorRef) {
    super();
    chartTypesService.getSupportedChartTypes().subscribe(
      (data: Array<ISupportedChart>) => this.supportedChartTypes = data.map((category: ISupportedChart) => category.type) // success path
      // error => this.error = error // error path
    );
    this.isVisible = new BehaviorSubject<boolean>(false);
   }

  ngAfterContentInit() {
    this.sub = this.formProperty.root.searchProperty(Object.keys(this.schema.showOnlyWhen)[0]).valueChanges.subscribe(
      (category: string) => 
      {
        this.isVisible.next(category === Object.values(this.schema.showOnlyWhen)[0][0]);
        this.formProperty.setValue('', false);
        this.cdr.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
