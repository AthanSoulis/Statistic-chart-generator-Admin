import { Query } from '../chart-creator/chart-query-selector/chart-query.model';

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
    yAxis: HCyaxis;
    series: Array<HCseriesInstance> = [];

    constructor() {
        this.chart = new HCchart();
        this.title = new HCtitle();
        this.yAxis = new HCyaxis();
    }
}

class HCchart {
    type: string;
}
class HCtitle {
    text: string;
}
class HCyaxis {
    title: HCtitle;
}

export class HCseriesInstance {
    name: string;
    query: Query;

    constructor() {
        this.query = new Query();
    }
}
