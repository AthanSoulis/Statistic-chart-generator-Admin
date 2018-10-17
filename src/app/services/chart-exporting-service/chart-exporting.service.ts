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

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService,
     private urlProvider: UrlProviderService) {

      this._loadingChartTinyUrl = new BehaviorSubject<boolean>(false);
      this.loadingChartTinyUrl$ = this._loadingChartTinyUrl.asObservable();

      this._chartUrl = new BehaviorSubject<string>(null);
      this.chartUrl$ = this._chartUrl.asObservable();
      this.chartUrl$.pipe(distinctUntilChanged()).subscribe(
        (chartUrl: string) => {
                    if (chartUrl) {
                      this.postTinyUrl(chartUrl);
                    } }, // success path
          error => this.errorHandler.handleError(error) // error path
      );

      this._chartTinyUrl = new BehaviorSubject<string>(null);
      this.chartTinyUrl$ = this._chartTinyUrl.asObservable();
    }

  changeChartUrl(chartObject: Object) {

    if (!chartObject) { return; }

    const stringObj = JSON.stringify(chartObject);
    this._chartUrl.next(this.urlProvider.getUrl() + '/chart?json=' + encodeURIComponent(stringObj));
  }

  private changeChartTinyUrl(generatedChartTinyUrl: string) {
    this._chartTinyUrl.next(generatedChartTinyUrl);
  }

  private postTinyUrl(chartUrl: string) {

    this._loadingChartTinyUrl.next(true);

    const postUrl = this.urlProvider.getUrl() + '/chart/shorten';

    const postHeaders = new HttpHeaders();
    postHeaders.append('Content-Type', 'application/json');

    this.http.post(postUrl,
      {'url' : encodeURIComponent(chartUrl) },
      {headers: postHeaders})
      .subscribe(
      // success path
      (response: ShortenUrlResponse) => this.changeChartTinyUrl(response.shortUrl),
      // error path
      error => this.errorHandler.handleError(error),
      // complete path
      () => this._loadingChartTinyUrl.next(false)
    );
  }
}

export class ShortenUrlResponse {
  public shortUrl: string;
}
