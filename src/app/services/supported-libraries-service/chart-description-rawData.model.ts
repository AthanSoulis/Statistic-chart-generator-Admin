import {ChartInfo} from '../../chart-creator/chart-query.model';

export class RawDataModel {
    library: string;
    chartsInfo: Array<ChartInfo> = [];

    constructor(library: string) {
        this.library = library;
    }
}
