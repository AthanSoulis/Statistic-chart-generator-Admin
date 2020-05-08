import { Injectable} from '@angular/core';
import { Observable, throwError, BehaviorSubject, of, } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { retry, catchError, distinctUntilChanged } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { UrlProviderService } from '../url-provider-service/url-provider.service';

type PostTinyUrlCallback = (shortUrl: string) => void;

export class ShortenUrlResponse {
  constructor(shortUrl: string) { this.shortUrl = shortUrl; }
  public shortUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChartExportingService {

  private _chartUrl: BehaviorSubject<string>;
  chartTinyUrl$: Observable<string>;
  private _chartTinyUrl: BehaviorSubject<string>;
  loadingChartTinyUrl$: Observable<boolean>;
  private _loadingChartTinyUrl: BehaviorSubject<boolean>;

  private _tableUrl: BehaviorSubject<string>;
  tableTinyUrl$: Observable<string>;
  private _tableTinyUrl: BehaviorSubject<string>;
  loadingTableTinyUrl$: Observable<boolean>;
  private _loadingTableTinyUrl: BehaviorSubject<boolean>;

  private _rawDataUrl: BehaviorSubject<string>;
  rawDataTinyUrl$: Observable<string>;
  private _rawDataTinyUrl: BehaviorSubject<string>;
  loadingRawDataTinyUrl$: Observable<boolean>;
  private _loadingRawDataTinyUrl: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService,
     private urlProvider: UrlProviderService) {

      // Chart Url Loader
      this._loadingChartTinyUrl = new BehaviorSubject<boolean>(false);
      this.loadingChartTinyUrl$ = this._loadingChartTinyUrl.asObservable();

      this._chartUrl = new BehaviorSubject<string>(null);
      this._chartTinyUrl = new BehaviorSubject<string>(null);
      this.chartTinyUrl$ = this._chartTinyUrl.asObservable();

      this._chartUrl.pipe(distinctUntilChanged()).subscribe(
        (chartUrl: string) => {
                    if (chartUrl) {
                      this.postTinyUrl(chartUrl, this._loadingChartTinyUrl, this._chartTinyUrl);
                    } }, // success path
          error => this.errorHandler.handleError(error) // error path
      );

      // Table Url Loader
      this._tableTinyUrl = new BehaviorSubject<string>(null);
      this.tableTinyUrl$ = this._tableTinyUrl.asObservable();

      this._loadingTableTinyUrl = new BehaviorSubject<boolean>(false);
      this.loadingTableTinyUrl$ = this._loadingTableTinyUrl.asObservable();

      this._tableUrl = new BehaviorSubject<string>(null);
      this._tableUrl.pipe(distinctUntilChanged()).subscribe(
        (tableUrl: string) => {
                    if (tableUrl) {
                      this.postTinyUrl(tableUrl, this._loadingTableTinyUrl, this._tableTinyUrl);
                    } }, // success path
          error => this.errorHandler.handleError(error) // error path
      );

      // Raw Data Url Loader
      this._rawDataTinyUrl = new BehaviorSubject<string>(null);
      this.rawDataTinyUrl$ = this._rawDataTinyUrl.asObservable();

      this._loadingRawDataTinyUrl = new BehaviorSubject<boolean>(false);
      this.loadingRawDataTinyUrl$ = this._loadingRawDataTinyUrl.asObservable();

      this._rawDataUrl = new BehaviorSubject<string>(null);
      this._rawDataUrl.pipe(distinctUntilChanged()).subscribe(
          (rawDataUrl: string) => {
              if (rawDataUrl) {
                  this.postTinyUrl(rawDataUrl, this._loadingRawDataTinyUrl, this._rawDataTinyUrl);
              } }, // success path
          error => this.errorHandler.handleError(error) // error path
      );
    }

  changeChartUrl(chartObject: Object) {

    if (!chartObject) { return; }

    const stringObj = JSON.stringify(chartObject);
    this._chartUrl.next(this.urlProvider.serviceURL + '/chart?json=' + encodeURIComponent(stringObj));
  }

  changeTableUrl(tableObject: Object) {

    if (!tableObject) { return; }

    const stringObj = JSON.stringify(tableObject);
    this._tableUrl.next(this.urlProvider.serviceURL + '/table?json=' + encodeURIComponent(stringObj));
  }

  changeRawDataUrl(rawDataObject: Object) {

      if (!rawDataObject) { return; }

      const stringObj = JSON.stringify(rawDataObject);
      this._rawDataUrl.next(this.urlProvider.serviceURL + '/chart/json?json=' + encodeURIComponent(stringObj));
  }

  private postTinyUrl(chartUrl: string, loader: BehaviorSubject<boolean>, tinyUrlSubject: BehaviorSubject<string> ) {

    loader.next(true);

    const postUrl = this.urlProvider.serviceURL + '/chart/shorten';

    const postHeaders = new HttpHeaders();
    postHeaders.append('Content-Type', 'application/json');

    const postSub = this.http.post(postUrl,
      {'url' : encodeURIComponent(chartUrl) },
      {headers: postHeaders})
      .pipe(
        catchError(
          err => {
            this.errorHandler.handleError(err);
            const unshortenedResponse = new ShortenUrlResponse(chartUrl);
            return of(unshortenedResponse);
        }))
      .subscribe(
      // success path
      (response: ShortenUrlResponse) => tinyUrlSubject.next(response.shortUrl),
      // error path
      error => {
        this.errorHandler.handleError(error);
       },
      // complete path
      () => {
        loader.next(false);
        postSub.unsubscribe();
      }
    );
  }
}

