import { Component, AfterViewInit, Injectable, OnChanges, SimpleChanges, AfterContentInit, OnDestroy, forwardRef, Inject, OnInit, Output, EventEmitter, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { DbSchemaService } from '../../services/db-schema-service/db-schema.service';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { MappingProfilesService, Profile } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { distinctUntilChanged, filter, catchError, retry } from 'rxjs/operators';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';
import { ErrorHandlerService } from '../../services/error-handler-service/error-handler.service';
import { ArrayProperty } from 'ngx-schema-form/lib/model/arrayproperty';
import { PropertyGroup, FormProperty } from 'ngx-schema-form/lib/model/formproperty';

@Component({
  selector: 'entity-selection-widget',
  templateUrl: './entity-selection-widget.component.html',
  styleUrls: ['./entity-selection-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitySelectionWidgetComponent extends ControlWidget implements OnInit, AfterContentInit, OnDestroy {

  @Output() entityChange: EventEmitter<any> = new EventEmitter();

  entities: Array<string>;
  mappingProfileServiceSubscription: Subscription;
  dbSchemaServiceSubscription: Subscription;
  valueChangesSubscription: Subscription;

  constructor(private dbSchemaService: DbSchemaService,
    private mappingProfileService: MappingProfilesService,
    private chartLoadingService: ChartLoadingService,
    private errorHandler: ErrorHandlerService,
    private cdr: ChangeDetectorRef) {
    super();
      
  }

  ngOnInit() {

    const yAxisDataProperty = this.formProperty.parent;
    const xAxisData = <ArrayProperty>yAxisDataProperty.searchProperty('xaxisData');
    const filters = <ArrayProperty>yAxisDataProperty.searchProperty('filters');

    // Reset the GroupBys and Filters when an Entity changes
    this.valueChangesSubscription = this.formProperty.valueChanges.pipe(distinctUntilChanged()).subscribe(
      (data) => {

        if (this.chartLoadingService.chartLoadingStatus)
          return;
        
        // Reset xAxis GroupBy
        this.resetXAxisGroupBy(xAxisData);
        // Reset Filter Rules
        this.resetDataseriesFilterRules(filters);
      });

    // Subscribe to the mappingProfileService in order to get notified of any mapping profile changes
    this.mappingProfileServiceSubscription = this.mappingProfileService.selectedProfile$
    .subscribe(profile => this.handleProfileChange(profile));
  }

  ngOnDestroy() {
    this.valueChangesSubscription.unsubscribe();
    this.mappingProfileServiceSubscription.unsubscribe();

    if (this.dbSchemaServiceSubscription && !this.chartLoadingService.chartLoadingStatus) {
      this.dbSchemaServiceSubscription.unsubscribe();
    }
  }

  ngAfterContentInit() {}

  resetXAxisGroupBy(xAxisData: ArrayProperty)
  {
    (<PropertyGroup[]> xAxisData.properties).forEach(
      (groupBy: PropertyGroup) => groupBy.reset(null, false)
    );
  }
  
  resetDataseriesFilterRules(filters: ArrayProperty)
  {
    (<PropertyGroup[]> filters.properties).forEach(
      (filterGroup: PropertyGroup) => {
        const filterRules: ArrayProperty = filterGroup.getProperty('groupFilters');
        
        (<PropertyGroup[]> filterRules.properties).forEach(
          (filterRule: PropertyGroup) => filterRule.reset(null, false));
      });
  }
  handleProfileChange(profile: Profile)
  {
    // We want to avoid certain functionality when a chart is Loading so notify that this Dataseries is loading
    if (this.chartLoadingService.chartLoadingStatus)
      this.chartLoadingService.increaseLoadingObs();

    this.dbSchemaServiceSubscription = this.dbSchemaService.getAvailableEntities(profile)
    .pipe(distinctUntilChanged(),
          catchError(err => { this.errorHandler.handleError(err); return of([]); })
      )
    .subscribe(
      // success path
      (data: Array<string>) => {
        
        // We want to avoid certain functionality when a chart is Loading so notify that this Dataseries stopped loading
        // When its not loading a chart and a profile change Reset the entity when a profile changes and its not loading a chart
        if (this.chartLoadingService.chartLoadingStatus)
          this.chartLoadingService.decreaseLoadingObs();
        else
          this.formProperty.reset(null, false);
        
        // Populate the entities field
        this.entities = data;

        // Let Angular know that the entities have changed
        this.cdr.markForCheck();
      },
      () => { if ( this.dbSchemaServiceSubscription )  this.dbSchemaServiceSubscription.unsubscribe(); });
  }
}
