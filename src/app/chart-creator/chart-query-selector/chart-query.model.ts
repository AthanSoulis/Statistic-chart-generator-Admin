import { Filter } from './query-filter-selector/query-filter/query-filter.model';
import { DataseriesFormSchema, DataFormSchema } from '../chart-form-schema.model';

export class Query {
    limit: string;
    profile: string;
    entity: string;
    select: Array<Select> = [];
    filters: Array<Filter> = [];

    constructor(dataseriesData: DataFormSchema, profile: string, limit: string) {
        this.entity = dataseriesData.yaxisData.entity;
        this.profile = profile;
        this.limit = limit;

        const yaxisSelect = new Select();

        if (dataseriesData.yaxisData.yaxisAggregate === 'total') {
            yaxisSelect.aggregate = 'count';
            yaxisSelect.field = this.entity;
        } else {
            yaxisSelect.aggregate = dataseriesData.yaxisData.yaxisAggregate;
            yaxisSelect.field = dataseriesData.yaxisData.yaxisEntityField.name;
        }
        this.select.push(yaxisSelect);

        dataseriesData.xaxisData.forEach(element => {
            const xaxisSelect = new Select();
            xaxisSelect.field = element.xaxisEntityField.name;
            this.select.push(xaxisSelect);
        });

        dataseriesData.filters.forEach(element => {
            const filter = new Filter();
            filter.field = element.field.name;
            filter.type = element.type;
            filter.values = element.values;
            this.filters.push(filter);
        });

    }
}

export class Select {
    field: string;
    aggregate: string;

    constructor() {
        this.field = null;
        this.aggregate = null;
    }
}

export class ChartInfo {
    name: string;
    type: string;
    color: string;
    query: Query;

    // constructor(query?: Query ) {
    //     this.query = query;
    //     this.name = null;
    //     this.type = null;
    //     if (query === undefined) {
    //         this.query = new Query();
    //     }
    // }

    constructor(dataseriesElement: DataseriesFormSchema, profile: string, limit: number) {
        this.name = dataseriesElement.chartProperties.dataseriesName;
        this.type = dataseriesElement.chartProperties.chartType;
        this.color = dataseriesElement.chartProperties.dataseriesColor;
        this.query = new Query(dataseriesElement.data, profile, limit.toString());
    }
}


