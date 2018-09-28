import { Filter } from './query-filter-selector/query-filter/query-filter.model';

export class Query {
    entity: string;
    select: Array<Select> = [];
    filters: Array<Filter> = [];

    constructor(dataseriesData: any) {
        this.entity = dataseriesData.yaxisData.entity;

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


