import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { SCGAFormSchema, ViewFormSchema, CategoryFormSchema, DataseriesFormSchema, AppearanceFormSchema } from '../../chart-creator/chart-form-schema.classes';
import { GoogleChartsTable, GoogleChartsChart } from '../supported-libraries-service/chart-description-GoogleCharts.model';
import { ChartInfo } from '../../chart-creator/chart-query.model';
import { HighChartsChart } from '../supported-libraries-service/chart-description-HighCharts.model';
import { isNullOrUndefined } from 'util';
import { HighMapsMap, HMSeriesInfo } from '../supported-libraries-service/chart-description-HighMaps.model';
import { DiagramCategoryService } from '../diagram-category-service/diagram-category.service';
import { ISupportedMap } from '../supported-chart-types-service/supported-chart-types.service';

export class DiagramCreator {

  constructor(private diagramCategoryService: DiagramCategoryService) {}

  public createChart(formObj: SCGAFormSchema): Observable<Object> {

      const view: ViewFormSchema = formObj.view;
      const category: CategoryFormSchema = formObj.category;
      const dataseries: DataseriesFormSchema[] = formObj.dataseries;
      const appearanceOptions: AppearanceFormSchema = formObj.appearance;
      const library: string = appearanceOptions.chartAppearance.generalOptions.library;

      // TODO we can make sure we dont send to the back end queries with unsupported libraries
      // ----------------------
      // this.supportedLibrariesService.getSupportedLibraries().subscribe(
      // (data: Array<string>) =>  {
      //     if (data.includes(library)) {

      console.log('Appearance', appearanceOptions);
      switch (library) {

        case('HighCharts'): {
            const hchartObj = this.createDynamicHighChartsChart(view, category, dataseries, appearanceOptions);
            console.log('Creating a ' + library + ' chart!', hchartObj);

            return of(hchartObj);
        }
        case('GoogleCharts'): {
            const gchartObj = this.createDynamicGoogleChartsChart(view, category, dataseries, appearanceOptions);
            console.log('Creating a ' + library + ' chart!', gchartObj);

            return of(gchartObj);
        }
        case('HighMaps'): {
          const hmapObj = this.createDynamicHighMapsMap(view, category, dataseries, appearanceOptions);
          console.log('Creating a ' + library + ' chart!', hmapObj);
          return of(hmapObj);
        }
        default: {
            return of(null);
        }
      }
          // }});
  }
  public createTable(formObj: SCGAFormSchema): Observable<Object> {

      const view: ViewFormSchema = formObj.view;
      const category: CategoryFormSchema = formObj.category;
      const dataseries: DataseriesFormSchema[] = formObj.dataseries;
      const appearanceOptions: AppearanceFormSchema = formObj.appearance;

      const tableObj = new GoogleChartsTable();

      dataseries.forEach( dataElement => {
        tableObj.tableDescription.queriesInfo.push(
          new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
            category.categoryType !== 'combo' ? category.categoryType :
            (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType)));
      });
      console.log('Creating a table!', tableObj);
      tableObj.tableDescription.options.pageSize = formObj.appearance.tableAppearance.paginationSize;
      console.log('Page Size:', tableObj.tableDescription.options.pageSize);
      return of(tableObj);
  }
  createDynamicGoogleChartsChart(view: ViewFormSchema, category: CategoryFormSchema,
      dataseries: DataseriesFormSchema[], appearanceOptions: AppearanceFormSchema): GoogleChartsChart {

      const chartObj = new GoogleChartsChart();
      const chartDescription = chartObj.chartDescription;

      chartDescription.GoogleChartType = category.categoryType;
      if (appearanceOptions.chartAppearance.googlechartsAppearanceOptions.titles) {
        chartDescription.options.title = appearanceOptions.chartAppearance.googlechartsAppearanceOptions.titles.title;
      }
      chartDescription.options.exporting = appearanceOptions.chartAppearance.googlechartsAppearanceOptions.exporting;
      chartDescription.options.isStacked = appearanceOptions.chartAppearance.googlechartsAppearanceOptions.stackedChart;

      if (appearanceOptions.chartAppearance.googlechartsAppearanceOptions.gcCABackGroundColor) {
        chartDescription.options.backgroundColor =
          appearanceOptions.chartAppearance.googlechartsAppearanceOptions.gcCABackGroundColor.substring(0, 7);
      }
      if (appearanceOptions.chartAppearance.googlechartsAppearanceOptions.gcPABackgroundColor) {
        chartDescription.options.chartArea.backgroundColor =
        appearanceOptions.chartAppearance.googlechartsAppearanceOptions.gcPABackgroundColor.substring(0, 7);
      }

      if (appearanceOptions.chartAppearance.googlechartsAppearanceOptions.axisNames) {
        chartDescription.options.hAxis.title = appearanceOptions.chartAppearance.googlechartsAppearanceOptions.axisNames.xaxisName;
        chartDescription.options.vAxis.title = appearanceOptions.chartAppearance.googlechartsAppearanceOptions.axisNames.yaxisName;
      }

      dataseries.forEach( dataElement => {
        chartDescription.queriesInfo.push(
          new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
            category.categoryType !== 'combo' ? category.categoryType :
            (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType )));
      });

      return chartObj;
  }

  createDynamicHighChartsChart(view: ViewFormSchema, category: CategoryFormSchema,
                               dataseries: DataseriesFormSchema[], appearanceOptions: AppearanceFormSchema): HighChartsChart {

    const chartObj = new HighChartsChart();

    // tslint:disable-next-line:max-line-length
    if (appearanceOptions.chartAppearance.highchartsAppearanceOptions !== undefined && appearanceOptions.chartAppearance.highchartsAppearanceOptions !== null) {
      // Exporting
      chartObj.chartDescription.exporting.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcMiscOptions.exporting;
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.plotOptions.series.stacking = appearanceOptions.chartAppearance.highchartsAppearanceOptions.stackedChart === 'undefined' ?
        undefined : appearanceOptions.chartAppearance.highchartsAppearanceOptions.stackedChart;

      // Legend Options
      chartObj.chartDescription.legend.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegend.hcEnableLegend;
      chartObj.chartDescription.legend.align = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegend.hcLegendHorizontalAlignment;
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.legend.verticalAlign = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegend.hcLegendVerticalAlignment;
      chartObj.chartDescription.legend.layout = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegend.hcLegendLayout;

      // Credits Options
      chartObj.chartDescription.credits.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCredits.hcEnableCredits;
      chartObj.chartDescription.credits.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCredits.hcCreditsText;

      if (appearanceOptions.chartAppearance.highchartsAppearanceOptions.titles) {
        chartObj.chartDescription.title.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.titles.title;
        chartObj.chartDescription.subtitle.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.titles.subtitle;
      }
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.plotOptions.series.dataLabels.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcMiscOptions.hcEnableDataLabels;

      // Chart Area Options
      chartObj.chartDescription.chart.backgroundColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcChartArea.hcCABackGroundColor;
      chartObj.chartDescription.chart.borderColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcChartArea.hcCABorderColor;
      chartObj.chartDescription.chart.borderRadius = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcChartArea.hcCABorderCornerRadius;
      chartObj.chartDescription.chart.borderWidth = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcChartArea.hcCABorderWidth;

      // Plot Area Options
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.chart.plotBackgroundColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPlotArea.hcPABackgroundColor;
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.chart.plotBackgroundImage = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPlotArea.hcPABackgroundImageURL;
      chartObj.chartDescription.chart.plotBorderColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPlotArea.hcPABorderColor;
      chartObj.chartDescription.chart.plotBorderWidth = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPlotArea.hcPABorderWidth;

      if (appearanceOptions.chartAppearance.highchartsAppearanceOptions.axisNames) {
        chartObj.chartDescription.xAxis.title.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.axisNames.xaxisName;
        chartObj.chartDescription.yAxis.title.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.axisNames.yaxisName;
      }
    }
    // Set Color Theme. More universal approach
    if (appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray.length > 1 || appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray[0] !== '#00000000') {
      chartObj.chartDescription.colors = appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray;
    }

      const queries = new Array<ChartInfo>();

      dataseries.forEach( dataElement => {
        queries.push(new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
          category.categoryType !== 'combo' ? category.categoryType :
          (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType )));
        // Set color for each data series. Works only for bars and columns.
        // if (appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray.length > 1 || appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray[0] !== '#00000000') {
        //   queries[queries.length - 1].color = appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray[queries.length - 1];
        // }
      });

      chartObj.chartDescription.queries = queries;
      return chartObj;
  }
  createDynamicHighMapsMap(view: ViewFormSchema, category: CategoryFormSchema,
    dataseries: DataseriesFormSchema[], appearanceOptions: AppearanceFormSchema): HighMapsMap {

    const mapObj = new HighMapsMap();
    mapObj.library = appearanceOptions.chartAppearance.generalOptions.library;

    // tslint:disable-next-line:max-line-length
    if (appearanceOptions.chartAppearance.highmapsAppearanceOptions !== undefined && appearanceOptions.chartAppearance.highmapsAppearanceOptions !== null) {
      // Color Axis
      mapObj.mapDescription.colorAxis.max = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmColorAxis.hmColorAxisMax === undefined ?
                                              null : appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmColorAxis.hmColorAxisMax;
      mapObj.mapDescription.colorAxis.min = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmColorAxis.hmColorAxisMin === undefined ?
                                              null : appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmColorAxis.hmColorAxisMin;
      mapObj.mapDescription.colorAxis.maxColor = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmColorAxis.hmColorAxisMaxColor;
      mapObj.mapDescription.colorAxis.minColor = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmColorAxis.hmColorAxisMinColor;
      mapObj.mapDescription.colorAxis.type = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmColorAxis.hmColorAxisType;
      // Exporting
      mapObj.mapDescription.exporting.enabled = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmMiscOptions.exporting;
      if (!isNullOrUndefined(appearanceOptions.chartAppearance.highmapsAppearanceOptions.titles)) {
        // Title
        mapObj.mapDescription.title.text = appearanceOptions.chartAppearance.highmapsAppearanceOptions.titles.title;
        // Subtitle
        mapObj.mapDescription.subtitle.text = appearanceOptions.chartAppearance.highmapsAppearanceOptions.titles.subtitle;
      }
      // MapNavigation
      mapObj.mapDescription.mapNavigation.enabled = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmMiscOptions.hmEnableMapNavigation;
      // Credits
      mapObj.mapDescription.credits.enabled =  appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmCredits.hmEnableCredits;
      mapObj.mapDescription.credits.text = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmCredits.hmCreditsText;
      // Legend
      mapObj.mapDescription.legend.enabled = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmLegend.hmEnableLegend;

    }

    dataseries.forEach( dataElement => {
      mapObj.mapDescription.series.push(
        // Dataseries Info
        new HMSeriesInfo(dataElement.chartProperties.dataseriesName,
          appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmMiscOptions.hmEnableDataLabels)
      );
      mapObj.mapDescription.queries.push(
        new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit, category.categoryType)
      );
    });

    mapObj.mapDescription.chart.map = this.diagramCategoryService
                                      .supportedMaps
                                      .find((map: ISupportedMap) => map.type === category.categoryType).name;

    return mapObj;
  }
}
