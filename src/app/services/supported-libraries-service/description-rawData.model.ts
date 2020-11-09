import {ChartInfo, Query} from '../../chart-creator/chart-query.model';
import {DataFormSchema} from '../../chart-creator/chart-form-schema.classes';

export class RawDataModel {
    orderBy: string;
    verbose: boolean;
    series: Array<QueryInfo> = [];

    constructor() {}
}

export class QueryInfo {
    query: Query;

    constructor(dataseriesData: DataFormSchema, profile: string, limit: string) {
        this.query = new Query(dataseriesData, profile, limit);
    }
}
