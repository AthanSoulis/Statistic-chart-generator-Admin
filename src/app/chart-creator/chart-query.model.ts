import { Filter, FilterGroup } from '../form-components/query-filter-selector/query-filter/query-filter.model';
import { DataseriesFormSchema, DataFormSchema } from './chart-form-schema.classes';

export class Query {
    name: string;
    limit: string;
    profile: string;
    entity: string;
    select: Array<Select> = [];
    filters: Array<FilterGroup> = [];

    constructor(dataseriesData: DataFormSchema, profile: string, limit: string, name?: string) {
        if (name) {
          this.name = name;
        } else {
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
            const filterGroup = new FilterGroup();
            filterGroup.op = element.op;

            element.groupFilters.forEach(groupFilter => {
              const filter = new Filter();
              filter.field = groupFilter.field.name;
              filter.type = groupFilter.type;
              filter.values = groupFilter.values;
              filterGroup.groupFilters.push(filter);
            });
            this.filters.push(filterGroup);
          });
        }
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

    constructor(dataseriesElement: DataseriesFormSchema, profile: string, limit: number, category: string, name?: string) {
        this.name = dataseriesElement.chartProperties.dataseriesName;
        if (dataseriesElement.chartProperties.chartType) {
          this.type = dataseriesElement.chartProperties.chartType;
        } else {
          this.type = category;
        }
        this.color = dataseriesElement.chartProperties.dataseriesColor;
        if (name) {
          this.query = new Query(dataseriesElement.data, profile, limit.toString(), name);
        } else {
          this.query = new Query(dataseriesElement.data, profile, limit.toString());
        }
    }
}


