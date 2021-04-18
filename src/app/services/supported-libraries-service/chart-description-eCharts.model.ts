import {Query, ChartInfo} from '../../chart-creator/chart-query.model';

export class EChartsChart {
    library: string;
    orderBy: string;
    chartDescription: EChartsDescription;

    constructor() {
        this.library = 'eCharts';
        this.orderBy = 'xaxis';
        this.chartDescription = new EChartsDescription();
    }
}

class EChartsDescription {
    chart: ECchart;
    title: ECtitle;
    yAxis: ECaxis;
    xAxis: ECaxis;
    backgroundColor: string | undefined;
    tooltip: ECTooltip;
    queries: Array<ChartInfo> = [];
    lang: ECLang;
    toolbox: ECExporting;
    plotOptions: ECPlotOptions;
    legend: ECLegend;
    color: string[] = ['#7cb5ec'];

    constructor() {
        this.chart = new ECchart();
        this.title = new ECtitle();
        this.yAxis = new ECaxis();
        this.xAxis = new ECaxis();
        this.lang = new ECLang();
        this.toolbox = new ECExporting();
        this.plotOptions = new ECPlotOptions();
        this.legend = new ECLegend();
        this.tooltip = new ECTooltip();
    }
}

class ECchart {
    type: string = 'line';
    backgroundColor: string = '#7cb5ec';
    borderColor: string;
    borderRadius: number;
    borderWidth: number;

    plotBackgroundImage: string;
    plotBackgroundColor: string;
    plotBorderColor: string;
    plotBorderWidth: number;
}
export class ECtitle {
    text: string = '';
    subtext: string = '';
}
class ECaxis {
    name: string | undefined;
}
class ECLang {
    noData = 'No Data available for the Query';
}

export class ECExporting {
    show: boolean;
    right: string | number = 'auto';
    left: string | number = 'auto';
    top: string | number = 'auto';
    bottom: string | number = 'auto';
    feature: ECToolboxFeature;
    constructor() {
        this.show = false;
        this.feature = new ECToolboxFeature();
    }
}

export class ECToolboxFeature {
    saveAsImage: ECToolboxFeatureItem;
    dataView: ECToolboxFeatureItem;
    constructor() {
        this.saveAsImage = new ECToolboxFeatureItem('Save as image');
        this.dataView = new ECToolboxFeatureItem('Data view');
    }
}

export class ECToolboxFeatureItem {
    title: string;
    constructor(title: string) {
        this.title = title;
    }
}

export class ECLegend {
    show: boolean = true;
    orient: 'horizontal' | 'vertical' = 'horizontal';
    right: string | number = 'auto';
    left: string | number = 'auto';
    top: string | number = 'auto';
    bottom: string | number = 'auto';
}

class ECPlotOptions {
    series: ECPlotOptionsSeries;
    constructor() {
        this.series = new ECPlotOptionsSeries();
    }
}

class ECPlotOptionsSeries {
    dataLabels: ECDataLabels;
    stacking: boolean;
    constructor() {
        this.dataLabels = new ECDataLabels();
        this.stacking = false;
    }
}

export class ECDataLabels {
    enabled: boolean = false;
    format: string | undefined = undefined;
}

export class ECTooltip {
    show: boolean;
    constructor() {
        this.show = true;
    }
}
