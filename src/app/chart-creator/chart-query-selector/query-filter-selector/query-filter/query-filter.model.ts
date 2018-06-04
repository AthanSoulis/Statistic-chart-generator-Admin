export class Filter {

    field: string;
    operator: string;
    values: Array<string>;

    constructor() {
        this.field = null;
        this.operator = null;
        this.values = [];
    }

}
