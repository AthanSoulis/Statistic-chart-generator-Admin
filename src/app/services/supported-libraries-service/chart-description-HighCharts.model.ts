import { Query, ChartInfo } from '../../chart-creator/chart-query-selector/chart-query.model';
import { ChartProperties } from '../../chart-creator/chart-properties-selector/chart-properties.model';

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
    yAxis: HCaxis;
    xAxis: HCaxis;
    queries: Array<ChartInfo> = [];
    lang: HCLang;

    constructor() {
        this.chart = new HCchart();
        this.title = new HCtitle();
        this.yAxis = new HCaxis();
        this.xAxis = new HCaxis();
        this.lang = new HCLang();
    }
}

class HCchart {
    type: string;
}
class HCtitle {
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

