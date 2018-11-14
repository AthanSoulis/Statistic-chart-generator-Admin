import { Injectable} from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { retry, catchError, distinctUntilChanged } from 'rxjs/operators';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { UrlProviderService } from '../url-provider-service/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ChartExportingService {

  chartUrl$: Observable<string>;
  private _chartUrl: BehaviorSubject<string>;
  chartTinyUrl$: Observable<string>;
  private _chartTinyUrl: BehaviorSubject<string>;
  loadingChartTinyUrl$: Observable<boolean>;
  private _loadingChartTinyUrl: BehaviorSubject<boolean>;

  tableUrl$: Observable<string>;
  private _tableUrl: BehaviorSubject<string>;
  tableTinyUrl$: Observable<string>;
  private _tableTinyUrl: BehaviorSubject<string>;
  loadingTableTinyUrl$: Observable<boolean>;
  private _loadingTableTinyUrl: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService,
     private urlProvider: UrlProviderService) {

      const context = this;
      // Chart Url Loader
      this._loadingChartTinyUrl = new BehaviorSubject<boolean>(false);
      this.loadingChartTinyUrl$ = this._loadingChartTinyUrl.asObservable();

      this._chartUrl = new BehaviorSubject<string>(null);
      this.chartUrl$ = this._chartUrl.asObservable();
      this._chartTinyUrl = new BehaviorSubject<string>(null);
      this.chartTinyUrl$ = this._chartTinyUrl.asObservable();

      this.chartUrl$.pipe(distinctUntilChanged()).subscribe(
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
      this.tableUrl$ = this._tableUrl.asObservable();
      this.tableUrl$.pipe(distinctUntilChanged()).subscribe(
        (tableUrl: string) => {
                    if (tableUrl) {
                      this.postTinyUrl(tableUrl, this._loadingTableTinyUrl, this._tableTinyUrl);
                    } }, // success path
          error => this.errorHandler.handleError(error) // error path
      );
    }

  changeChartUrl(chartObject: Object) {

    if (!chartObject) { return; }

    const stringObj = JSON.stringify(chartObject);
    this._chartUrl.next(this.urlProvider.getUrl() + '/chart?json=' + encodeURIComponent(stringObj));
  }

  private changeChartTinyUrl(generatedChartTinyUrl: string) {
    this._chartTinyUrl.next(generatedChartTinyUrl);
  }

  changeTableUrl(tableObject: Object) {

    if (!tableObject) { return; }

    const stringObj = JSON.stringify(tableObject);
    this._tableUrl.next(this.urlProvider.getUrl() + '/table?json=' + encodeURIComponent(stringObj));
  }

  protected changeTableTinyUrl(generatedTableTinyUrl: string) {
    this._tableTinyUrl.next(generatedTableTinyUrl);
  }

  private postTinyUrl(chartUrl: string, loader: BehaviorSubject<boolean>, tinyUrlSubject: BehaviorSubject<string> ) {

    // this._loadingChartTinyUrl.next(true);
    loader.next(true);

    const postUrl = this.urlProvider.getUrl() + '/chart/shorten';

    const postHeaders = new HttpHeaders();
    postHeaders.append('Content-Type', 'application/json');

    this.http.post(postUrl,
      {'url' : encodeURIComponent(chartUrl) },
      {headers: postHeaders})
      .subscribe(
      // success path
      (response: ShortenUrlResponse) => tinyUrlSubject.next(response.shortUrl), // this.changeChartTinyUrl(response.shortUrl),
      // error path
      error => this.errorHandler.handleError(error),
      // complete path
      () => loader.next(false) // this._loadingChartTinyUrl.next(false)
    );
  }
}

type PostTinyUrlCallback = (shortUrl: string) => void;

export class ShortenUrlResponse {
  public shortUrl: string;
}
