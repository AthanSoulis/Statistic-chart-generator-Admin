import { Query } from '../../chart-creator/chart-query-selector/chart-query.model';
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
    queries: Array<HCqueriesInstance> = [];
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

export class HCqueriesInstance {
    name: string;
    type: string;
    query: Query;

    // constructor(query?: Query ) {
    //     this.query = query;
    //     this.name = null;
    //     this.type = null;
    //     if (query === undefined) {
    //         this.query = new Query();
    //     }
    // }

    constructor(dataseriesElement: Object) {
        this.name = dataseriesElement.chartProperties.dataseriesName;
        this.type = dataseriesElement.chartProperties.chartType;
        this.query = new Query(dataseriesElement.data);
    }
}
