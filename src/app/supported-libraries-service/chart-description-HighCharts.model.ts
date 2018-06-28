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
    lang: HCLang;

    constructor() {
        this.chart = new HCchart();
        this.title = new HCtitle();
        this.yAxis = new HCyaxis();
        this.lang = new HCLang();
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

    constructor() {
        this.title = new HCtitle();
    }
}
class HCLang {
    noData = 'No Data available for the Query';
}

export class HCseriesInstance {
    name: string;
    query: Query;

    constructor(query?: Query ) {
        this.query = query;
        this.name = null;
        if (query === undefined) {
            this.query = new Query();
        }
    }
}
