import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { ChartFrameComponent } from './chart-frame/chart-frame.component';
import { ChartPropertiesSelectorComponent } from './chart-creator/chart-properties-selector/chart-properties-selector.component';
import { ChartDataPresentationTableComponent } from './chart-data-presentation-table/chart-data-presentation-table.component';
import { ChartQuerySelectorComponent } from './chart-creator/chart-query-selector/chart-query-selector.component';
import { ChartDataPresentationTableRowComponent } from './chart-data-presentation-table/chart-data-presentation-table-row/chart-data-presentation-table-row.component';
import { SelectAttributeComponent } from './chart-creator/chart-query-selector/select-attribute/select-attribute.component';
import { ChartCreatorComponent } from './chart-creator/chart-creator.component';
import { QueryFilterSelectorComponent } from './chart-creator/chart-query-selector/query-filter-selector/query-filter-selector.component';
import { QueryFilterComponent } from './chart-creator/chart-query-selector/query-filter-selector/query-filter/query-filter.component';
import { AutocompleteInputFieldComponent } from './chart-creator/chart-query-selector/query-filter-selector/query-filter/autocomplete-input-field/autocomplete-input-field.component';

import { SupportedLibrariesService } from './services/supported-libraries-service/supported-libraries.service';
import { DbSchemaService } from './services/db-schema-service/db-schema.service';
import { SupportedFilterTypesService } from './services/supported-filter-types-service/supported-filter-types.service';
import { SupportedAggregateFunctionsService } from './services/supported-aggregate-functions-service/supported-aggregate-functions.service';
import { SupportedChartTypesService } from './services/supported-chart-types-service/supported-chart-types.service';
import { UrlProviderService } from './services/url-provider-service/url-provider.service';
import { FieldAutocompleteService } from './services/field-autocomplete-service/field-autocomplete.service';
import { MappingProfilesService } from './services/mapping-profiles-service/mapping-profiles.service';
import { ChartExportingService } from './services/chart-exporting-service/chart-exporting.service';
import { ErrorHandlerService } from './services/error-handler-service/error-handler.service';
import { ChartLoadingService } from './services/chart-loading-service/chart-loading.service';

import { SuiModule } from 'ng2-semantic-ui';

import { ColorPickerModule } from 'ngx-color-picker';

import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'ngx-schema-form';
import { GeneralPropertiesWidgetComponent } from './custom-ngx-schema-form-widgets/general-properties-widget/general-properties-widget.component';
import { CustomWidgetRegistry } from './custom-ngx-schema-form-widgets/custom-widget-registry';
import { PropertyWidgetComponent } from './custom-ngx-schema-form-widgets/property-widget/property-widget.component';
import { LibrarySelectionWidgetComponent } from './custom-ngx-schema-form-widgets/library-selection-widget/library-selection-widget.component';
import { SelectionWidgetComponent } from './custom-ngx-schema-form-widgets/selection-widget/selection-widget.component';
import { ChartTypeSelectionWidgetComponent } from './custom-ngx-schema-form-widgets/chart-type-selection-widget/chart-type-selection-widget.component';
import { EntitySelectionWidgetComponent } from './custom-ngx-schema-form-widgets/entity-selection-widget/entity-selection-widget.component';
import { AggregateSelectionWidgetComponent } from './custom-ngx-schema-form-widgets/aggregate-selection-widget/aggregate-selection-widget.component';
import { EntityFieldSelectionWidgetComponent } from './custom-ngx-schema-form-widgets/entity-field-selection-widget/entity-field-selection-widget.component';
import { ArrayWidgetComponent } from './custom-ngx-schema-form-widgets/array-widget/array-widget.component';
import { FilterFieldWidgetComponent } from './custom-ngx-schema-form-widgets/filter-field-widget/filter-field-widget.component';
import { OperatorSelectionWidgetComponent } from './custom-ngx-schema-form-widgets/operator-selection-widget/operator-selection-widget.component';
import { FilterPropertyWidgetComponent } from './custom-ngx-schema-form-widgets/filter-property-widget/filter-property-widget.component';
import { ProfilePickerComponent } from './custom-ngx-schema-form-widgets/profile-picker/profile-picker.component';
import { FilterFieldArrayWidgetComponent } from './custom-ngx-schema-form-widgets/filter-field-array-widget/filter-field-array-widget.component';
import { TabularMenuWidgetComponent } from './custom-ngx-schema-form-widgets/tabular-menu-widget/tabular-menu-widget.component';
import { HeadMenuWidgetComponent } from './custom-ngx-schema-form-widgets/head-menu-widget/head-menu-widget.component';
import { RadioWidgetComponent } from './custom-ngx-schema-form-widgets/radio-widget/radio-widget.component';
import { ColorPickerWidgetComponent } from './custom-ngx-schema-form-widgets/color-picker-widget/color-picker-widget.component';
import { BooleanFieldWidgetComponent } from './custom-ngx-schema-form-widgets/boolean-field-widget/boolean-field-widget.component';
import { NumberFieldWidgetComponent } from './custom-ngx-schema-form-widgets/number-field-widget/number-field-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartFrameComponent,
    ChartPropertiesSelectorComponent,
    ChartDataPresentationTableComponent,
    ChartQuerySelectorComponent,
    ChartDataPresentationTableRowComponent,
    ChartCreatorComponent,
    QueryFilterSelectorComponent,
    QueryFilterComponent,
    SelectAttributeComponent,
    AutocompleteInputFieldComponent,
    GeneralPropertiesWidgetComponent,
    PropertyWidgetComponent,
    LibrarySelectionWidgetComponent,
    SelectionWidgetComponent,
    ChartTypeSelectionWidgetComponent,
    EntitySelectionWidgetComponent,
    AggregateSelectionWidgetComponent,
    EntityFieldSelectionWidgetComponent,
    ArrayWidgetComponent,
    FilterFieldWidgetComponent,
    OperatorSelectionWidgetComponent,
    FilterPropertyWidgetComponent,
    ProfilePickerComponent,
    FilterFieldArrayWidgetComponent,
    TabularMenuWidgetComponent,
    HeadMenuWidgetComponent,
    RadioWidgetComponent,
    ColorPickerWidgetComponent,
    BooleanFieldWidgetComponent,
    NumberFieldWidgetComponent,
  ],
  imports: [
    SchemaFormModule.forRoot(),
    SuiModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatAutocompleteModule,
    ColorPickerModule
  ],
  entryComponents: [
    GeneralPropertiesWidgetComponent,
    PropertyWidgetComponent,
    LibrarySelectionWidgetComponent,
    SelectionWidgetComponent,
    ChartTypeSelectionWidgetComponent,
    EntitySelectionWidgetComponent,
    AggregateSelectionWidgetComponent,
    EntityFieldSelectionWidgetComponent,
    ArrayWidgetComponent,
    FilterFieldWidgetComponent,
    OperatorSelectionWidgetComponent,
    FilterPropertyWidgetComponent,
    ProfilePickerComponent,
    FilterFieldArrayWidgetComponent,
    TabularMenuWidgetComponent,
    HeadMenuWidgetComponent,
    RadioWidgetComponent,
    ColorPickerWidgetComponent,
    BooleanFieldWidgetComponent,
    NumberFieldWidgetComponent,
  ],
  providers: [
    SupportedLibrariesService,
    DbSchemaService,
    SupportedFilterTypesService,
    SupportedAggregateFunctionsService,
    SupportedChartTypesService,
    UrlProviderService,
    FieldAutocompleteService,
    MappingProfilesService,
    ChartExportingService,
    ErrorHandlerService,
    ChartLoadingService,
    {provide: WidgetRegistry, useClass: CustomWidgetRegistry},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
