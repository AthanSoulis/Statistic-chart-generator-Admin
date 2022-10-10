import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AggregateFunction {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})

export class SupportedAggregateFunctionsService {

  constructor() { }

  getSupportedAggregateFunctionFilterY(): Observable<Array<AggregateFunction>> {
    return of([
      {name: 'Total', code: 'total'},
      {name: 'Count', code: 'count'},
      {name: 'Sum', code: 'sum'},
      {name: 'Minimum', code: 'min'},
      {name: 'Maximum', code: 'max'},
      {name: 'Average', code: 'avg'}]);
  }

  getSupportedAggregateFunctionFilterX(): Observable<Array<AggregateFunction>> {
    return of([]);
  }
}
