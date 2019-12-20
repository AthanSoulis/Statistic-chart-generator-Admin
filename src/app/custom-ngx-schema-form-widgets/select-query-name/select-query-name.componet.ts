import {Component, OnInit} from '@angular/core';
import {ControlWidget} from 'ngx-schema-form';

@Component({
  selector: 'select-query-name',
  templateUrl: './select-query-name.component.html'
})

export class SelectQueryNameComponent extends ControlWidget implements OnInit {

  test: QueryDescription[] = [];

  ngOnInit(): void {
    let temp: QueryDescription = {name: 'oso.gold.year.Germany', description: 'desk', query: 'query', parameters: [{name: 'name', type: 'type'}]};
    this.test.push(temp);
    temp = {name: 'oso.green.year.Germany', description: 'desk', query: 'query', parameters: [{name: 'name', type: 'type'}]};
    this.test.push(temp);
  }

  printChange (event) {
    console.log(event.target);
  }
}


class QueryDescription {
  name: string;
  description: string;
  query: string;
  parameters: Parameter[];
}

class Parameter {
  name: string;
  type?: string;
}
