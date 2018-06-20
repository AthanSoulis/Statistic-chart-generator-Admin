import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

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

import { SupportedLibrariesService } from './supported-libraries-service/supported-libraries.service';
import { DbSchemaService } from './db-schema-service/db-schema.service';
import { SupportedFilterTypesService } from './supported-filter-types-service/supported-filter-types.service';
import { SupportedAggregateFunctionsService } from './supported-aggregate-functions-service/supported-aggregate-functions.service';
import { SupportedChartTypesService } from './supported-chart-types-service/supported-chart-types.service';
import { UrlProviderService } from './url-provider-service/url-provider.service';

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
    SelectAttributeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatTreeModule,
    MatIconModule
  ],
  providers: [SupportedLibrariesService, DbSchemaService, SupportedFilterTypesService,
     SupportedAggregateFunctionsService, SupportedChartTypesService, UrlProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
