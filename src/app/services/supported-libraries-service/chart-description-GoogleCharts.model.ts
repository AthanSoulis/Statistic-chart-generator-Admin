import { Query, ChartInfo } from '../../chart-creator/chart-query-selector/chart-query.model';

export class GoogleChartsChart {
    library: string;
    chartDescription: GoogleChartsDescription;

    constructor() {
        this.library = 'GoogleCharts';
        this.chartDescription = new GoogleChartsDescription();
    }
}

export class GoogleChartsTable {
    library: string;
    tableDescription: GoogleChartsDescription;

    constructor() {
        this.library = 'GoogleCharts';
        this.tableDescription = new GoogleChartsDescription();
    }
}

class GoogleChartsTableDescription {

    queriesInfo: ChartInfo[];
    columns: string[];
    options: GoogleChartsOptions;
    constructor() {
        this.queriesInfo = [];
        this.columns = new Array<string>();
        this.options = new GoogleChartsOptions();
    }
}

class GoogleChartsDescription {
    chartType: string;
    columns: string[];
    queriesInfo: ChartInfo[];
    options: GoogleChartsOptions;

    constructor() {
        this.queriesInfo = [];
        this.columns = new Array<string>();
        this.options = new GoogleChartsOptions();
    }

    set GoogleChartType (type: string) {
        switch (type) {
            case 'area':
                this.chartType = 'AreaChart';
                break;
            case 'bar':
                this.chartType = 'BarChart';
                break;
            case 'column':
                this.chartType = 'ColumnChart';
                break;
            case 'line':
                this.chartType = 'LineChart';
                break;
            case 'pie':
                this.chartType = 'PieChart';
                break;
            default :
                this.chartType = 'ComboChart';
                break;
        }
    }
}

class GoogleChartsOptions {
    title: string;
    backgroundColor: string;
    hAxis: GoogleChartsAxis;
    vAxis: GoogleChartsAxis;
    series: GoogleChartSeries [];
    chartArea: GoogleChartsChartArea;
    exporting: boolean;
    pageSize: number;
    isStacked: string;

    constructor() {
        this.hAxis = new GoogleChartsAxis();
        this.vAxis = new GoogleChartsAxis();
        this.chartArea = new GoogleChartsChartArea();
        this.series = [];
        this.exporting = false;
        this.pageSize = 50;
        this.isStacked = 'false';
    }
}

class GoogleChartsChartArea {
    backgroundColor: string;
}

class GoogleChartsAxis {
    title: string;
}

class GoogleChartSeries {
    type: string;

    setGoogleChartType(type: string) {
        switch (type) {
            case 'area':
                this.type = 'area';
                break;
            case 'bar':
                this.type = 'bars';
                break;
            case 'column':
                this.type = 'bars';
                break;
            case 'line':
                this.type = 'line';
                break;
            default :
                this.type = 'line';
                break;
        }
    }
}
