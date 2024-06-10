import {ChartInfo} from '../../chart-creator/chart-query.model';

export class RawChartDataModel {
    library: string;
    orderBy: string | null = null;
    drilldown: boolean | null = null;
    chartsInfo: Array<ChartInfo> = [];

    constructor(library: string) {
        this.library = library;
    }
}
