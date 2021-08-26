import { Injectable} from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, distinctUntilChanged, first } from 'rxjs/operators';
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

  // Chart Url
  private _chartUrl = new BehaviorSubject<string>(null);
  private _chartTinyUrl = new BehaviorSubject<string>(null);
  get chartTinyUrl$() { return this._chartTinyUrl.asObservable();}
  // Chart Load Url
  private _loadingChartTinyUrl= new BehaviorSubject<boolean>(false);
  get loadingChartTinyUrl$() { return this._loadingChartTinyUrl.asObservable();}

  // Table Url
  private _tableUrl = new BehaviorSubject<string>(null);
  private _tableTinyUrl = new BehaviorSubject<string>(null);
  get tableTinyUrl$() { return this._tableTinyUrl.asObservable();}
  // Table Load Url
  private _loadingTableTinyUrl = new BehaviorSubject<boolean>(false);
  get loadingTableTinyUrl$() { return this._loadingTableTinyUrl.asObservable();}

  // Raw Chart Data Url
  private _rawChartDataUrl = new BehaviorSubject<string>(null);
  private _rawChartDataTinyUrl = new BehaviorSubject<string>(null);
  get rawChartDataTinyUrl$() { return this._rawChartDataTinyUrl.asObservable();}
  // Raw Chart Data Load Url
  private _loadingRawChartDataTinyUrl = new BehaviorSubject<boolean>(false);
  get loadingRawChartDataTinyUrl$() { return this._loadingRawChartDataTinyUrl.asObservable();}

  // Raw Data Url
  private _rawDataUrl= new BehaviorSubject<string>(null);
  private _rawDataTinyUrl = new BehaviorSubject<string>(null);
  get rawDataTinyUrl$() { return this._rawDataTinyUrl.asObservable();}
  // Raw Data Load Url
  private _loadingRawDataTinyUrl = new BehaviorSubject<boolean>(false);
  get loadingRawDataTinyUrl$() { return this._loadingRawDataTinyUrl.asObservable();}

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, private urlProvider: UrlProviderService) {

      // Chart Url Loader
      this._chartUrl.pipe(distinctUntilChanged()).subscribe(
        (chartUrl: string) => this.handleStringURL(chartUrl, this._loadingChartTinyUrl, this._chartTinyUrl), // success path
        error => this.errorHandler.handleError(error) // error path
      );

      // Table Url Loader
      this._tableUrl.pipe(distinctUntilChanged()).subscribe(
        (tableUrl: string) => this.handleStringURL(tableUrl, this._loadingTableTinyUrl, this._tableTinyUrl), // success path 
          error => this.errorHandler.handleError(error) // error path
      );

      // Raw Chart Data Url Loader
      this._rawChartDataUrl.pipe(distinctUntilChanged()).subscribe(
          (rawChartDataUrl: string) => this.handleStringURL(rawChartDataUrl, this._loadingRawChartDataTinyUrl, this._rawChartDataTinyUrl), // success path  
          error => this.errorHandler.handleError(error) // error path
      );

      // Raw Data Url Loader
      this._rawDataUrl.pipe(distinctUntilChanged()).subscribe(
          (rawDataUrl: string) => this.handleStringURL(rawDataUrl, this._loadingRawDataTinyUrl, this._rawDataTinyUrl), // success path  
          error => this.errorHandler.handleError(error) // error path
      );
    }
  
  private handleStringURL(stringURL: string, _loadingTinyUrl: BehaviorSubject<boolean>, _tinyUrl: BehaviorSubject<string>)
  { stringURL ? this.postTinyUrl(stringURL, _loadingTinyUrl, _tinyUrl) : _tinyUrl.next(null); }

  private postTinyUrl(chartUrl: string, loader: BehaviorSubject<boolean>, tinyUrlSubject: BehaviorSubject<string> ) {

    loader.next(true);

    const postUrl = this.urlProvider.serviceURL + '/chart/shorten';

    const postHeaders = new HttpHeaders();
    postHeaders.append('Content-Type', 'application/json');

    this.http.post(postUrl,
      {'url' : encodeURIComponent(chartUrl) },
      {headers: postHeaders})
      .pipe(first(),
        catchError(
          err => {
            this.errorHandler.handleError(err);
            const unshortenedResponse = new ShortenUrlResponse(chartUrl);
            return of(unshortenedResponse);
        }))
      .subscribe(
      // success path
      (response: ShortenUrlResponse) => {
          tinyUrlSubject.next(response.shortUrl);
          console.log('tinyURLResponse ->', response.shortUrl);
      },
      // error path
      error => this.errorHandler.handleError(error)
      ,
      // complete path
      () => loader.next(false)
    );
  }

  public changeChartUrl(chartObject: Object) {

    if (!chartObject)
    {
      this._chartUrl.next(null);
      return;
    }

    this._chartUrl.next(this.urlProvider.createChartURL(chartObject));
  }

  public changeTableUrl(tableObject: Object) {

    if (!tableObject)
    {
      this._tableUrl.next(null)
      return;
    }

    this._tableUrl.next(this.urlProvider.createTableURL(tableObject));
  }

  public changeRawChartDataUrl(rawChartDataObject: Object) {

    if (!rawChartDataObject)
    {
      this._rawChartDataUrl.next(null)
      return;
    }

    this._rawChartDataUrl.next(this.urlProvider.createRawChartDataUrl(rawChartDataObject));
  }

  public changeRawDataUrl(rawDataObject: Object) {

    if (!rawDataObject)
    {
      this._rawDataUrl.next(null)
      return;
    }

    this._rawDataUrl.next(this.urlProvider.createRawDataUrl(rawDataObject));
  }
}
