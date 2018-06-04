import { Filter } from './query-filter-selector/query-filter/query-filter.model';

export class Query {
    entity: string;
    select: Array<Select> = [];
    filters: Array<Filter> = [];
}

export class Select {
    field: string;
    aggregate: string;

    constructor() {
        this.field = null;
        this.aggregate = null;
    }
}


