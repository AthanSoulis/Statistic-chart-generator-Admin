import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChartCreatorComponent } from './chart-creator/chart-creator.component';
import { UrlProviderService } from './services/url-provider-service/url-provider.service';
import { ChartExportingService } from './services/chart-exporting-service/chart-exporting.service';
import { IPopup } from 'ng2-semantic-ui';
import { Observable, of } from 'rxjs';
import { SuiPopupController } from 'ng2-semantic-ui/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(ChartCreatorComponent) childChartCreator;

  private _publishPopUpCondition: boolean;
  private _exportPopUpCondition: boolean;

  chartObject: Object;
  tableObject: Object;

  chartUrl: Observable<string>;
  chartTinyUrl: Observable<string>;
  loadingChartTinyUrl: Observable<boolean>;

  constructor(private urlProvider: UrlProviderService,
    private chartExportingService: ChartExportingService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Popup is closed initially
    this._publishPopUpCondition = false;
    this.chartUrl = this.chartExportingService.chartUrl$;
    this.chartTinyUrl = this.chartExportingService.chartTinyUrl$;
    this.loadingChartTinyUrl = this.chartExportingService.loadingChartTinyUrl$;
    this.loadingChartTinyUrl.subscribe(
      (loading: boolean) => console.log('Loading Tiny Url: ' + loading)
    );
  }

  handleChartObject($event) {
    console.log('Handle chart Object called!');
    this.chartObject = $event.value;
    console.log(this.chartObject);
  }

  handleTableObject($event) {
    console.log('Handle table Object called!');
    this.tableObject = $event.value;
    console.log(this.tableObject);
  }

  public togglePublishPopUp(popup: IPopup) {

    if (!this._publishPopUpCondition) {
      this.publishChart();
    }
    popup.toggle();
    this._publishPopUpCondition = !this._publishPopUpCondition;
  }

  private exportChart(popup: IPopup) {

    if (!(this.childChartCreator instanceof ChartCreatorComponent)) {
      console.error('childChartCreator not an instance of ChartCreatorComponent');
      return;
    }

    if (!this._exportPopUpCondition) {

      const chartJSON = this.childChartCreator.chartFormValue;
      this.createAndDownloadJSON(chartJSON, 'chart.json');
    }
    popup.toggle();
    this._exportPopUpCondition = !this._exportPopUpCondition;
  }

  createAndDownloadJSON(jsonObj: Object, filename) {

    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonObj)));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }

  private loadChart() {}

  private publishChart() {

    if (!(this.childChartCreator instanceof ChartCreatorComponent)) {
      console.error('childChartCreator not an instance of ChartCreatorComponent');
      return;
    }

    const chartObj$ = this.childChartCreator.createChart();
    chartObj$.subscribe(
      (chartObj: any) => {
        console.log(chartObj);
        this.chartExportingService.changeChartUrl(chartObj);
        chartObj$.unsubscribe();
      }
    );
  }
}
