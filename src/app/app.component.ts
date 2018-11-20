import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChartCreatorComponent } from './chart-creator/chart-creator.component';
import { UrlProviderService } from './services/url-provider-service/url-provider.service';
import { ChartExportingService } from './services/chart-exporting-service/chart-exporting.service';
import { IPopup, PopupPlacement } from 'ng2-semantic-ui';
import { Observable, of } from 'rxjs';
import { SuiPopupController, SuiPopup } from 'ng2-semantic-ui/dist';
import { ChartLoadingService } from './services/chart-loading-service/chart-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(ChartCreatorComponent) childChartCreator;

  private _publishPopUpCondition: boolean;
  private _exportPopUpCondition: boolean;

  chartModel: Object;
  chartObject: Object;
  tableObject: Object;
  loadedChartFile: File = null;

  activePopUp: SuiPopup;

  popupPlacement = PopupPlacement.Bottom;

  constructor(private urlProvider: UrlProviderService,
    protected chartExportingService: ChartExportingService,
    protected chartLoadingService: ChartLoadingService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Popup is closed initially
    this._publishPopUpCondition = false;
  }

  handlePopUpOpen(event: any) {
    console.log(event);
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

  handleClearForm() {
    this.chartObject = undefined;
    this.tableObject = undefined;
  }

  public togglePublishPopUp(popup: IPopup) {

    if (!this._publishPopUpCondition) {
      this.publishChart();
    }
    popup.toggle();
    // this._publishPopUpCondition = !this._publishPopUpCondition;
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
    // this._exportPopUpCondition = !this._exportPopUpCondition;
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

  private initiateFilePicker() {
    const fileElem = document.getElementById('fileElem');
    if (fileElem) {
      fileElem.click();
    }
  }

  private loadChart(event: any) {

    this.loadedChartFile = null;
    if (event) {

      const fr: FileReader = new FileReader();

      fr.onload = () => {
        const loadedChart: Object = JSON.parse(<string>fr.result);
        this.chartModel = loadedChart;
      };
      fr.onloadstart = () => { this.chartLoadingService.chartLoadingStatus = true;  };
      fr.onloadend = () => {
        this.loadedChartFile = event.target.files[0];
        this.handleClearForm();
      };

      fr.readAsText(event.target.files[0]);
    }
  }

  private publishChart() {

    if (!(this.childChartCreator instanceof ChartCreatorComponent)) {
      console.error('childChartCreator not an instance of ChartCreatorComponent');
      return;
    }

    if (this.childChartCreator.isFormValid) {
      const chartObj$ = this.childChartCreator.createChart();
      chartObj$.subscribe(
        (chartObj: any) => {
          this.chartExportingService.changeChartUrl(chartObj);
          chartObj$.unsubscribe();
        }
      );

      const tableObj$ = this.childChartCreator.createTable();
      tableObj$.subscribe(
        (tableObj: any) => {
          this.chartExportingService.changeTableUrl(tableObj);
          tableObj$.unsubscribe();
        }
      ); }
  }
}
