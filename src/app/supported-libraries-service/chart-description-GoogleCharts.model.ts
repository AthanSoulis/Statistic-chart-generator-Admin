import { Query } from '../chart-creator/chart-query-selector/chart-query.model';

export class GoogleChartsChart {
    library: string;
    chartDescription: GoogleChartsDescription;

    constructor() {
        this.library = 'GoogleCharts';
        this.chartDescription = new GoogleChartsDescription();
    }
}

class GoogleChartsDescription {
    chartType: string;
    columns: string[];
    queries: Query[];
    options: GoogleChartsOptions;

    constructor() {
        this.queries = new Array<Query>();
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
                break;
        }
    }
}

class GoogleChartsOptions {
    title: string;
    hAxis: GoogleChartsHAxis;

    constructor() {
        this.hAxis = new GoogleChartsHAxis();
    }
}

class GoogleChartsHAxis {
    title: string;
}
