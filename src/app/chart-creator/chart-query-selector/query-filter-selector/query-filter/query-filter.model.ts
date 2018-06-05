export class Filter {

    field: string;
    operator: string;
    values: Array<String>;
    // values: Array<FilterValue>;

    constructor() {
        this.field = null;
        this.operator = null;
        this.values = [];
        // this.values = new Array<FilterValue>();
        // this.values = ['oy', 'laddy'];
    }
}

class FilterValue {
    value: string;
    constructor() {
        this.value = 'idi nahui';
    }
}
