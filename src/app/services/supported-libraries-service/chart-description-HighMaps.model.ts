import { ChartInfo } from '../../chart-creator/chart-query.model';
import { HCtitle, HCsubtitle, HCExporting, HCCredits, HCDataLabels, HCLegend } from './chart-description-HighCharts.model';

export class HighMapsMap {
    library: string;
    mapDescription: HighMapsDescription;

    constructor() {
        this.library = 'HighMaps';
        this.mapDescription = new HighMapsDescription();
    }
}

class HighMapsDescription {

    chart: HMChart;
    colorAxis: HMColorAxis;
    credits: HCCredits;
    exporting: HCExporting;
    legend: HCLegend;
    mapNavigation: HMNavigation;
    queries: Array<ChartInfo>;
    series: Array<HMSeriesInfo>;
    subtitle: HCsubtitle;
    title: HCtitle;

    constructor() {
        this.chart = new HMChart();
        this.colorAxis = new HMColorAxis();
        this.credits = new HCCredits();
        this.exporting = new HCExporting();
        this.exporting.enabled = true;
        this.legend = new HCLegend();
        this.mapNavigation = new HMNavigation();
        this.queries = [];
        this.series = [];
        this.subtitle = new HCsubtitle();
        this.title = new HCtitle();
    }
}

class HMChart {
    map = undefined;
}

class HMNavigation {
    enabled = false;
}

class HMColorAxis {
    min: number | undefined = undefined;
    max: number | undefined= undefined;
    type = 'linear';
    minColor = '#e6ebf5';
    maxColor = '#003399';
}

export class HMSeriesInfo {
    data = [];
    name: string;
    keys = ['iso-a2', 'value'];
    joinBy = 'iso-a2';
    dataLabels: HCDataLabels;

    constructor(name: string, dataLabelsEnabled: boolean) {
        this.dataLabels = new HCDataLabels();
        this.dataLabels.enabled = dataLabelsEnabled;
        this.dataLabels.format = '{point.name}';
        this.name = name;
    }
}
