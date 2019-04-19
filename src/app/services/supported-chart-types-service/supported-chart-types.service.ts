import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UrlProviderService } from '../url-provider-service/url-provider.service';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';

@Injectable()
export class SupportedChartTypesService {

constructor(private http: HttpClient, private urlProvider: UrlProviderService, private errorHandler: ErrorHandlerService) {}

  getSupportedChartTypes(): Observable<Array<ISupportedChart>> {

    const supportedChartTypesUrl = this.urlProvider.serviceURL + '/chart/types';
    return this.http.get<Array<ISupportedChart>>(supportedChartTypesUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getSupportedMaps(): Observable<Array<ISupportedMap>> {

    const supportedMapsUrl = this.urlProvider.serviceURL + '/chart/maps';
    return this.http.get<Array<ISupportedMap>>(supportedMapsUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getSupportedSpecialChartTypes(): Observable<Array<ISupportedSpecialChartType>> {

    const supportedSpecialChartTypesUrl = this.urlProvider.serviceURL + '/chart/special';
    return this.http.get<Array<ISupportedSpecialChartType>>(supportedSpecialChartTypesUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }
}

export interface ISupportedCategory {
  type: string;
  supportedLibraries: Array<string>;
}

export interface ISupportedChart extends ISupportedCategory {
  type: string;
  supportedLibraries: Array<string>;
}
export interface ISupportedMap extends ISupportedCategory {
  type: string;
  name: string;
  supportedLibraries: Array<string>;
}
export interface ISupportedSpecialChartType extends ISupportedCategory {
  type: string;
  supportedLibraries: Array<string>;
}

