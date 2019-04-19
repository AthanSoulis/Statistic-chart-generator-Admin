import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { SCGAFormSchema, ViewFormSchema, CategoryFormSchema, DataseriesFormSchema, AppearanceFormSchema } from '../../chart-creator/chart-form-schema.classes';
import { SupportedLibrariesService } from '../supported-libraries-service/supported-libraries.service';
import { GoogleChartsTable, GoogleChartsChart } from '../supported-libraries-service/chart-description-GoogleCharts.model';
import { ChartInfo } from '../../chart-creator/chart-query.model';
import { HighChartsChart } from '../supported-libraries-service/chart-description-HighCharts.model';
import { isNullOrUndefined } from 'util';

export class DiagramCreator {

  constructor(private supportedLibrariesService: SupportedLibrariesService) {}

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

          switch (library) {

              case('HighCharts'): {
                  console.log('Appearance', appearanceOptions);
                  const hchartObj = this.createDynamicHighChartsChart(view, category, dataseries, appearanceOptions);
                  console.log('Creating a ' + library + ' chart!', hchartObj);

                  return of(hchartObj);
              }
              case('GoogleCharts'): {
                  console.log('Appearance', appearanceOptions);
                  const gchartObj = this.createDynamicGoogleChartsChart(view, category, dataseries, appearanceOptions);
                  console.log('Creating a ' + library + ' chart!', gchartObj);

                  return of(gchartObj);
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

      const queries = new Array<ChartInfo>();

      dataseries.forEach( dataElement => {
        queries.push(new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
          category.categoryType !== 'combo' ? category.categoryType :
          (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType )));
      });

      chartObj.chartDescription.queries = queries;
      return chartObj;
  }
}
