import {Subject, BehaviorSubject, Observable, of} from 'rxjs';
import {
    SCGAFormSchema,
    ViewFormSchema,
    CategoryFormSchema,
    DataseriesFormSchema,
    AppearanceFormSchema
} from '../../chart-creator/chart-form-schema.classes';
import {
    GoogleChartsTable,
    GoogleChartsChart
} from '../supported-libraries-service/chart-description-GoogleCharts.model';
import {ChartInfo, Query} from '../../chart-creator/chart-query.model';
import {HighChartsChart} from '../supported-libraries-service/chart-description-HighCharts.model';
import {isNullOrUndefined} from 'util';
import {HighMapsMap, HMSeriesInfo} from '../supported-libraries-service/chart-description-HighMaps.model';
import {DiagramCategoryService} from '../diagram-category-service/diagram-category.service';
import {ISupportedMap} from '../supported-chart-types-service/supported-chart-types.service';
import {EChartsChart, ECToolboxFeature} from '../supported-libraries-service/chart-description-eCharts.model';
import {RawChartDataModel} from '../supported-libraries-service/chart-description-rawChartData.model';
import {QueryInfo, RawDataModel} from '../supported-libraries-service/description-rawData.model';

export class DiagramCreator {

    private hcColorTheme = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
    private ecColorTheme = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074',
        '#546570', '#c4ccd3'];

    constructor(private diagramCategoryService: DiagramCategoryService) {
    }

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
            case('eCharts'): {
                const echartObj = this.createDynamicEChartsChart(view, category, dataseries, appearanceOptions);
                console.log('Creating a ' + library + ' chart!', echartObj);

                return of(echartObj);
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

        dataseries.forEach(dataElement => {
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

    public createRawChartData(formObj: SCGAFormSchema): Observable<Object> {

        const view: ViewFormSchema = formObj.view;
        const category: CategoryFormSchema = formObj.category;
        const dataseries: DataseriesFormSchema[] = formObj.dataseries;
        const appearanceOptions: AppearanceFormSchema = formObj.appearance;
        const library: string = appearanceOptions.chartAppearance.generalOptions.library;

        const rawChartDataModel = new RawChartDataModel(library);
        if (appearanceOptions.chartAppearance.generalOptions && appearanceOptions.chartAppearance.generalOptions.orderByAxis !== null) {
            rawChartDataModel.orderBy = appearanceOptions.chartAppearance.generalOptions.orderByAxis;
        }

        dataseries.forEach(dataElement => {
            rawChartDataModel.chartsInfo.push(
                new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
                    category.categoryType !== 'combo' ? category.categoryType :
                        (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType)));
        });
        console.log('Creating a rawChartData model!', rawChartDataModel);
        return of(rawChartDataModel);
    }

    public createRawData(formObj: SCGAFormSchema): Observable<Object> {

        const view: ViewFormSchema = formObj.view;
        // const category: CategoryFormSchema = formObj.category;
        const dataseries: DataseriesFormSchema[] = formObj.dataseries;
        const appearanceOptions: AppearanceFormSchema = formObj.appearance;

        const rawDataModel = new RawDataModel();
        if (appearanceOptions.chartAppearance.generalOptions && appearanceOptions.chartAppearance.generalOptions.orderByAxis !== null) {
            rawDataModel.orderBy = appearanceOptions.chartAppearance.generalOptions.orderByAxis;
        }

        dataseries.forEach(dataElement => {
            rawDataModel.series.push(
                new QueryInfo(dataElement.data, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit.toString()));
        });
        console.log('Creating a rawData model!', rawDataModel);
        return of(rawDataModel);
    }

    createDynamicGoogleChartsChart(view: ViewFormSchema, category: CategoryFormSchema,
                                   dataseries: DataseriesFormSchema[], appearanceOptions: AppearanceFormSchema): GoogleChartsChart {

        const chartObj = new GoogleChartsChart();
        const chartDescription = chartObj.chartDescription;

        chartDescription.GoogleChartType = category.categoryType;

        if (appearanceOptions.chartAppearance.generalOptions !== undefined
            && appearanceOptions.chartAppearance.generalOptions.orderByAxis !== null) {
            chartObj.orderBy = appearanceOptions.chartAppearance.generalOptions.orderByAxis;
        }

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

        dataseries.forEach(dataElement => {
            chartDescription.queriesInfo.push(
                new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
                    category.categoryType !== 'combo' ? category.categoryType :
                        (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType)));
        });

        return chartObj;
    }

    createDynamicHighChartsChart(view: ViewFormSchema, category: CategoryFormSchema,
                                 dataseries: DataseriesFormSchema[], appearanceOptions: AppearanceFormSchema): HighChartsChart {

        const chartObj = new HighChartsChart();

        if (appearanceOptions.chartAppearance.generalOptions !== undefined
            && appearanceOptions.chartAppearance.generalOptions.orderByAxis !== null) {
            chartObj.orderBy = appearanceOptions.chartAppearance.generalOptions.orderByAxis;
        }

        if (appearanceOptions.chartAppearance.highchartsAppearanceOptions !== undefined
            && appearanceOptions.chartAppearance.highchartsAppearanceOptions !== null) {
            // Exporting
            chartObj.chartDescription.exporting.enabled =
                appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcMiscOptions.exporting;

            chartObj.chartDescription.plotOptions.series.stacking =
            appearanceOptions.chartAppearance.highchartsAppearanceOptions.stackedChart === 'undefined' ?
                undefined : appearanceOptions.chartAppearance.highchartsAppearanceOptions.stackedChart;

            // Legend Options
            chartObj.chartDescription.legend.enabled =
            appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegend.hcEnableLegend;
            chartObj.chartDescription.legend.align =
            appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegend.hcLegendHorizontalAlignment;

            chartObj.chartDescription.legend.verticalAlign =
            appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegend.hcLegendVerticalAlignment;
            chartObj.chartDescription.legend.layout = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegend.hcLegendLayout;

            // Credits Options
            chartObj.chartDescription.credits.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCredits.hcEnableCredits;
            chartObj.chartDescription.credits.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCredits.hcCreditsText;

            if (appearanceOptions.chartAppearance.highchartsAppearanceOptions.titles) {
                chartObj.chartDescription.title.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.titles.title;
                chartObj.chartDescription.subtitle.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.titles.subtitle;
            }

            chartObj.chartDescription.plotOptions.series.dataLabels.enabled =
            appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcMiscOptions.hcEnableDataLabels;

            // Chart Area Options
            chartObj.chartDescription.chart.backgroundColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcChartArea.hcCABackGroundColor;
            chartObj.chartDescription.chart.borderColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcChartArea.hcCABorderColor;
            chartObj.chartDescription.chart.borderRadius = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcChartArea.hcCABorderCornerRadius;
            chartObj.chartDescription.chart.borderWidth = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcChartArea.hcCABorderWidth;

            // Plot Area Options

            chartObj.chartDescription.chart.plotBackgroundColor =
            appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPlotArea.hcPABackgroundColor;

            chartObj.chartDescription.chart.plotBackgroundImage =
            appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPlotArea.hcPABackgroundImageURL;
            chartObj.chartDescription.chart.plotBorderColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPlotArea.hcPABorderColor;
            chartObj.chartDescription.chart.plotBorderWidth = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPlotArea.hcPABorderWidth;

            if (appearanceOptions.chartAppearance.highchartsAppearanceOptions.axisNames) {
                chartObj.chartDescription.xAxis.title.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.axisNames.xaxisName;
                chartObj.chartDescription.yAxis.title.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.axisNames.yaxisName;
            }
        }
        // Set Color Theme. More universal approach
        if (appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray.length > 1 || appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray[0] !== '#00000000') {
            chartObj.chartDescription.colors = appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray.concat(this.hcColorTheme);
        }

        const queries = new Array<ChartInfo>();

        dataseries.forEach(dataElement => {
            queries.push(new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
                category.categoryType !== 'combo' ? category.categoryType :
                    (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType)));
            // Set color for each data series. Works only for bars and columns.
            // if (appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray.length > 1
            //     || appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray[0] !== '#00000000') {
            //   queries[queries.length - 1].color = appearanceOptions.chartAppearance.highchartsAppearanceOptions.dataSeriesColorArray[queries.length - 1];
            // }
        });

        chartObj.chartDescription.queries = queries;
        return chartObj;
    }

    createDynamicEChartsChart(view: ViewFormSchema, category: CategoryFormSchema,
                              dataseries: DataseriesFormSchema[], appearanceOptions: AppearanceFormSchema): EChartsChart {

        const chartObj = new EChartsChart();

        if (appearanceOptions.chartAppearance.generalOptions !== undefined
            && appearanceOptions.chartAppearance.generalOptions.orderByAxis !== null) {
            chartObj.orderBy = appearanceOptions.chartAppearance.generalOptions.orderByAxis;
        }

        // tslint:disable-next-line:max-line-length
        if (appearanceOptions.chartAppearance.echartsAppearanceOptions !== undefined && appearanceOptions.chartAppearance.echartsAppearanceOptions !== null) {
            // Exporting
            // tslint:disable-next-line:max-line-length
            chartObj.chartDescription.toolbox.show = appearanceOptions.chartAppearance.echartsAppearanceOptions.ecMiscOptions.exporting;
            if (chartObj.chartDescription.toolbox.show) {
                chartObj.chartDescription.toolbox.right = '10';
                chartObj.chartDescription.toolbox.feature = new ECToolboxFeature();
            }
            // tslint:disable-next-line:max-line-length
            chartObj.chartDescription.plotOptions.series.stacking = appearanceOptions.chartAppearance.echartsAppearanceOptions.ecMiscOptions.stackedChart;

            // Legend Options
            chartObj.chartDescription.legend.show = appearanceOptions.chartAppearance.echartsAppearanceOptions.ecLegend.ecEnableLegend;
            chartObj.chartDescription.legend.orient = appearanceOptions.chartAppearance.echartsAppearanceOptions.ecLegend.ecLegendLayout;
            // tslint:disable-next-line:max-line-length
            chartObj.chartDescription.legend.left = appearanceOptions.chartAppearance.echartsAppearanceOptions.ecLegend.ecLegendHorizontalAlignment;
            // tslint:disable-next-line:max-line-length
            chartObj.chartDescription.legend.top = appearanceOptions.chartAppearance.echartsAppearanceOptions.ecLegend.ecLegendVerticalAlignment;

            if (appearanceOptions.chartAppearance.echartsAppearanceOptions.titles) {
                chartObj.chartDescription.title.text = appearanceOptions.chartAppearance.echartsAppearanceOptions.titles.title;
                chartObj.chartDescription.title.subtext = appearanceOptions.chartAppearance.echartsAppearanceOptions.titles.subtitle;
            }
            // tslint:disable-next-line:max-line-length
            chartObj.chartDescription.plotOptions.series.dataLabels.enabled = appearanceOptions.chartAppearance.echartsAppearanceOptions.ecMiscOptions.hcEnableDataLabels;

            // Chart Area Options
            // tslint:disable-next-line:max-line-length
            chartObj.chartDescription.backgroundColor = appearanceOptions.chartAppearance.echartsAppearanceOptions.ecChartArea.ecCABackGroundColor;

            if (appearanceOptions.chartAppearance.echartsAppearanceOptions.axisNames) {
                chartObj.chartDescription.xAxis.name = appearanceOptions.chartAppearance.echartsAppearanceOptions.axisNames.xaxisName;
                chartObj.chartDescription.yAxis.name = appearanceOptions.chartAppearance.echartsAppearanceOptions.axisNames.yaxisName;
            }
        }
        // Set Color Theme. More universal approach
        if (appearanceOptions.chartAppearance.echartsAppearanceOptions.dataSeriesColorArray.length > 1
            || appearanceOptions.chartAppearance.echartsAppearanceOptions.dataSeriesColorArray[0] !== '#00000000') {
            // tslint:disable-next-line:max-line-length
            chartObj.chartDescription.color = appearanceOptions.chartAppearance.echartsAppearanceOptions.dataSeriesColorArray.concat(this.ecColorTheme);
        }

        console.log('chartObj.chartDescription', chartObj.chartDescription);

        const queries = new Array<ChartInfo>();

        dataseries.forEach(dataElement => {
            queries.push(new ChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
                category.categoryType !== 'combo' ? category.categoryType :
                    (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType)));
            // if (appearanceOptions.chartAppearance.echartsAppearanceOptions.hcMiscOptions.hcEnableDataLabels) {
            //     queries.push(new ECChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
            //         category.categoryType !== 'combo' ? category.categoryType :
            //             (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType ),
            //         new ECSeriesDataLabel()));
            // } else {
            //     queries.push(new ECChartInfo(dataElement, view.profile, appearanceOptions.chartAppearance.generalOptions.resultsLimit,
            //         category.categoryType !== 'combo' ? category.categoryType :
            //             (isNullOrUndefined(dataElement.chartProperties.chartType) ? 'line' : dataElement.chartProperties.chartType ),
            //         null));
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
            mapObj.mapDescription.credits.enabled = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmCredits.hmEnableCredits;
            mapObj.mapDescription.credits.text = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmCredits.hmCreditsText;
            // Legend
            mapObj.mapDescription.legend.enabled = appearanceOptions.chartAppearance.highmapsAppearanceOptions.hmLegend.hmEnableLegend;

        }

        dataseries.forEach(dataElement => {
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
