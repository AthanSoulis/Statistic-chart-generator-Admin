import { Query, ChartInfo } from '../../chart-creator/chart-query-selector/chart-query.model';

export class GoogleChartsChart {
    library: string;
    chartDescription: GoogleChartsDescription;

    constructor() {
        this.library = 'GoogleCharts';
        this.chartDescription = new GoogleChartsDescription();
    }
}

class GoogleChartsDescription {
    tableForm?: boolean;
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
    hAxis: GoogleChartsAxis;
    vAxis: GoogleChartsAxis;
    series: GoogleChartSeries [];
    exporting: boolean;

    constructor() {
        this.hAxis = new GoogleChartsAxis();
        this.vAxis = new GoogleChartsAxis();
        this.series = [];
        this.exporting = false;
    }
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
