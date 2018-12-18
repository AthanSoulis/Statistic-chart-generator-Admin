import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { UrlProviderService } from '../url-provider-service/url-provider.service';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';

@Injectable()
export class SupportedChartTypesService {

constructor(private http: HttpClient, private urlProvider: UrlProviderService, private errorHandler: ErrorHandlerService) {}

  getSupportedChartTypes(): Observable<Array<string>> {

    const supportedChartTypesUrl = this.urlProvider.serviceURL + '/chart/types';
    return this.http.get<Array<string>>(supportedChartTypesUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }
}
