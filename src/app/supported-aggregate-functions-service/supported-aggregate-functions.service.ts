import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportedAggregateFunctionsService {

  constructor() { }

  getSupportedAggregateFunctionFilterY(): Observable<Array<string>> {
    return of(['total', 'count', 'min', 'max', 'avg']);
  }

  getSupportedAggregateFunctionFilterX(): Observable<Array<string>> {
    return of([]);
  }
}
