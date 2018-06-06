export class Filter {

    field: string;
    type: string;
    values: Array<string>;

    constructor() {
        this.field = null;
        this.type = null;
        this.values = [];
    }
}

