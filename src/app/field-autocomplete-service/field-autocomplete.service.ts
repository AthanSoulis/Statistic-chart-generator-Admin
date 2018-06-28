import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { UrlProviderService } from '../url-provider-service/url-provider.service';

export class AutocompleteResponse {
  count: number =  null;
  values: Array<string> = [];
}

@Injectable({
  providedIn: 'root'
})
export class FieldAutocompleteService {

  constructor(private http: HttpClient, private urlProvider: UrlProviderService) {}

  getAutocompleteFields(field: string, text: string): Observable<AutocompleteResponse> {

    let autocompleteFieldTextUrl = this.urlProvider.getUrl()
    + '/schema/fields/' + field + (text === null ? '' : '/' + text);

    autocompleteFieldTextUrl = encodeURI(autocompleteFieldTextUrl);

    console.log('Calling: ' + autocompleteFieldTextUrl);
    return this.http.get<AutocompleteResponse>(autocompleteFieldTextUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
