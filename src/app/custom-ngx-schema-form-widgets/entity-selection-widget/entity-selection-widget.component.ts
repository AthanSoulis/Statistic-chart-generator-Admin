import { Component, AfterViewInit, Injectable, OnChanges, SimpleChanges, AfterContentInit, OnDestroy, forwardRef, Inject, OnInit, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { DbSchemaService } from '../../services/db-schema-service/db-schema.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MappingProfilesService } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { ChartLoadingService } from '../../services/chart-loading-service/chart-loading.service';
import { ErrorHandlerService } from '../../services/error-handler-service/error-handler.service';
import { ArrayProperty } from 'ngx-schema-form/lib/model/arrayproperty';
import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { FormProperty, PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';
import { ObjectProperty } from 'ngx-schema-form/lib/model/objectproperty';

@Component({
  selector: 'entity-selection-widget',
  templateUrl: './entity-selection-widget.component.html',
  styleUrls: ['./entity-selection-widget.component.css'],
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
    private errorHandler: ErrorHandlerService) {
    super();
  }

  ngOnInit() {

    const yAxisDataProperty = this.formProperty.parent;
    const xAxisData = <ArrayProperty>yAxisDataProperty.searchProperty('xaxisData');
    const filters = <ArrayProperty>yAxisDataProperty.searchProperty('filters');

    // Reset the GroupBys and Filters when an Entity changes
    this.valueChangesSubscription = this.formProperty.valueChanges.subscribe(
      (data) => {

        if (!this.chartLoadingService.chartLoadingStatus) {
          // Reset xAxis GroupBy
          (<PropertyGroup[]> xAxisData.properties).forEach(
            (groupBy: PropertyGroup) => groupBy.reset(null, false)
          );
          // Reset Filter Rules
          (<PropertyGroup[]> filters.properties).forEach(
            (filterGroup: PropertyGroup) => {
              const filterRules: ArrayProperty = filterGroup.getProperty('groupFilters');
              (<PropertyGroup[]> filterRules.properties).forEach(
                (filterRule: PropertyGroup) => filterRule.reset(null, false)
              );
            }
          );
        }});

    // Subscribe to the mappingProfileService in order to get notified of any mapping profile changes
    this.mappingProfileServiceSubscription = this.mappingProfileService.selectedProfile$
    .subscribe(profile => {

      // We want to avoid certain functionality when a chart is Loading
      // so notify that this Dataseries is loading
      if (this.chartLoadingService.chartLoadingStatus) {
        this.chartLoadingService.increaseLoadingObs();
      }

      this.dbSchemaServiceSubscription = this.dbSchemaService.getAvailableEntities(profile).pipe(distinctUntilChanged()).subscribe(
        // success path
        (data: Array<string>) => {

          // Reset the entity when a profile changes and its not loading a chart
          if (!this.chartLoadingService.chartLoadingStatus) {
            this.formProperty.reset(null, false);
          }
          // Get a hold of the new entities
          this.entities = data;
        },
        (error) => this.errorHandler.handleError(error),
        () => {
          // We want to avoid certain functionality when a chart is Loading
          // so notify that this Dataseries stopped loading
          if ( this.chartLoadingService.chartLoadingStatus) {
            this.chartLoadingService.decreaseLoadingObs();
          }
          if ( this.dbSchemaServiceSubscription ) {
            this.dbSchemaServiceSubscription.unsubscribe();
          }
        }
      );
    });
  }

  ngOnDestroy() {
    this.valueChangesSubscription.unsubscribe();
    this.mappingProfileServiceSubscription.unsubscribe();

    if (this.dbSchemaServiceSubscription && !this.chartLoadingService.chartLoadingStatus) {
      this.dbSchemaServiceSubscription.unsubscribe();
    }
  }

  ngAfterContentInit() {}
}
