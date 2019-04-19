import { Query, ChartInfo } from '../../chart-creator/chart-query.model';

export class HighChartsChart {
    library: string;
    chartDescription: HighChartsDescription;

    constructor() {
        this.library = 'HighCharts';
        this.chartDescription = new HighChartsDescription();
    }
}

class HighChartsDescription {
    chart: HCchart;
    title: HCtitle;
    subtitle: HCsubtitle;
    yAxis: HCaxis;
    xAxis: HCaxis;
    queries: Array<ChartInfo> = [];
    lang: HCLang;
    exporting: HCExporting;
    plotOptions: HCPlotOptions;
    legend: HCLegend;
    credits: HCCredits;

    constructor() {
        this.chart = new HCchart();
        this.title = new HCtitle();
        this.subtitle = new HCsubtitle();
        this.yAxis = new HCaxis();
        this.xAxis = new HCaxis();
        this.lang = new HCLang();
        this.exporting = new HCExporting();
        this.plotOptions = new HCPlotOptions();
        this.legend = new HCLegend();
        this.credits = new HCCredits();
    }
}

class HCchart {
    type: string;
    backgroundColor: string;
    borderColor: string;
    borderRadius: number;
    borderWidth: number;

    plotBackgroundImage: string;
    plotBackgroundColor: string;
    plotBorderColor: string;
    plotBorderWidth: number;
}
export class HCsubtitle {
    text: string;
}
export class HCtitle {
    text: string;
}
class HCaxis {
    title: HCtitle;

    constructor() {
        this.title = new HCtitle();
    }
}
class HCLang {
    noData = 'No Data available for the Query';
}

export class HCExporting {
    enabled: boolean;
    constructor() {
        this.enabled = false;
    }
}

export class HCLegend {
    enabled: boolean;
    layout: string;
    align: string;
    verticalAlign: string;
}

class HCPlotOptions {
    series: HCPlotOptionsSeries;
    constructor() {
        this.series = new HCPlotOptionsSeries();
    }
}

class HCPlotOptionsSeries {
    dataLabels: HCDataLabels;
    stacking: string;
    constructor() {
        this.dataLabels = new HCDataLabels();
        this.stacking = undefined;
    }
}

export class HCDataLabels {
    enabled: boolean;
    format: string = undefined;
}

export class HCCredits {
    enabled: boolean;
    text: string;
    href: string = null;
}
