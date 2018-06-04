import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum FieldTypes {text, int, float, date}

@Injectable({
  providedIn: 'root'
})
export class SupportedFilterTypesService {

  constructor() { }

  getSupportedFilterTypes(): Observable<Array<string>> {
    return of(['=', '!=', '>', '>=', '<', '<=', 'between', 'contains', 'starts_with', 'ends_with']);
  }
}
