import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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

import { SuiModule } from 'ng2-semantic-ui';

import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from 'ngx-schema-form';

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
    AutocompleteInputFieldComponent
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
    MatAutocompleteModule
  ],
  providers: [SupportedLibrariesService, DbSchemaService, SupportedFilterTypesService,
     SupportedAggregateFunctionsService, SupportedChartTypesService, UrlProviderService,
     FieldAutocompleteService, MappingProfilesService, ChartExportingService, ErrorHandlerService,
     {provide: WidgetRegistry, useClass: DefaultWidgetRegistry}],
  bootstrap: [AppComponent]
})
export class AppModule { }
