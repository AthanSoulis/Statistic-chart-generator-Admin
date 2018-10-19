import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Query, Select, ChartInfo } from './chart-query-selector/chart-query.model';
import { ChartProperties } from './chart-properties-selector/chart-properties.model';
import { SupportedLibrariesService } from '../services/supported-libraries-service/supported-libraries.service';
import { HighChartsChart} from '../services/supported-libraries-service/chart-description-HighCharts.model';
import { GoogleChartsChart } from '../services/supported-libraries-service/chart-description-GoogleCharts.model';
import { Filter } from './chart-query-selector/query-filter-selector/query-filter/query-filter.model';
import { Profile } from '../services/mapping-profiles-service/mapping-profiles.service';
import { Subject } from 'rxjs';
import { FormSchema } from './chart-form-schema.model';

@Component({
  selector: 'chart-creator',
  templateUrl: './chart-creator.component.html',
  styleUrls: ['./chart-creator.component.css']
})
export class ChartCreatorComponent implements OnInit, AfterViewInit {

  @Output() chartSubmit: EventEmitter<Object> = new EventEmitter();
  @Output() tableSubmit: EventEmitter<Object> = new EventEmitter();
  @Input() loadedChart: Object = null;

  profileMapping: Profile = null;
  public dataseriesTabActive: boolean[] = [];

  fs: FormSchema;
  formValue: string;
  private _isFormValid;

  constructor(private formBuilder: FormBuilder,
    private supportedLibrariesService: SupportedLibrariesService) {
      this.fs = new FormSchema();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {}

  get chartFormValue(): Object { return this.formValue as Object; }

  dynamicFormChanged($event) {
    this.formValue = $event.value;
  }

  onSubmit() {
    console.log('On Submit called');
    console.log(this.chartFormValue);

    const chartObj$ = this.createChart();
    chartObj$.subscribe(
      (chartObj: any) => {
        this.chartSubmit.emit({value: chartObj});
        chartObj$.unsubscribe();
      }
    );


    // if (hchartObj === null) { hchartObj = this.createHighChartsChart(this.properties, this.queryForm); }
    // this.tableSubmit.emit({value: hchartObj});
  }

  createChart(): Subject<Object> {

    const chartObj: Subject<Object> = new Subject();
    const formObj: any = this.chartFormValue;

    const generalProperties: any = formObj.generalChartProperties;
    const library: string = generalProperties.library;

    const dataseries: Object[] = formObj.dataseries;

    this.supportedLibrariesService.getSupportedLibraries().subscribe(
      (data: Array<string>) =>  {
        if (data.includes(library)) {

          switch (library) {

            case('HighCharts'): {
              // const hchartObj = this.createHighChartsChart(this.properties, this.getQueryForm(0));
              const hchartObj = this.createDynamicHighChartsChart(generalProperties, dataseries);

              console.log('Creating a ' + library + ' chart!');
              console.log(hchartObj);

              chartObj.next(hchartObj);
              break;
            }
            case('GoogleCharts'): {
              const gchartObj = this.createDynamicGoogleChartsChart(generalProperties, dataseries);

              console.log('Creating a ' + library + ' chart!');
              console.log(gchartObj);

              chartObj.next(gchartObj);
              break;
            }
            default: {
              chartObj.next(null);
              break;
            }
          }
        }});
    return chartObj;
  }

  createGoogleChartsChart(properties: FormGroup, queryForm: FormGroup) {
    const chartObj = new GoogleChartsChart();
    const chartDescription = chartObj.chartDescription;

    // chartDescription.queries.push(this.getFormQuery(queryForm));
    chartDescription.GoogleChartType = properties.get('type').value as string;
    // TODO This does NOT take into account multiple Dataseries
    chartDescription.columns.push(null);
    chartDescription.columns.push(null);

    chartDescription.options.title = properties.get('title').value as string;
    chartDescription.options.vAxis.title = properties.get('yaxisName').value as string;
    chartDescription.options.hAxis.title = properties.get('xaxisName').value as string;

    if (!chartDescription.chartType || chartDescription.columns || chartDescription.columns.length === 0) {
      console.log('GoogleChart: Something is missing!');
      console.log(chartObj);
      // return null;
    }

    return chartObj;
  }

  createDynamicGoogleChartsChart(generalProperties: any, dataseries: Object[]): GoogleChartsChart {
    const chartObj = new GoogleChartsChart();
    const chartDescription = chartObj.chartDescription;

    let baseChartType: any;
    if (dataseries.length > 0) {
      baseChartType = (<any>dataseries[0]).chartProperties.chartType;

      for (let index = 0; index < dataseries.length; index++) {
        const element = dataseries[index];
        if (baseChartType !== (<any>element).chartProperties.chartType ) {
          baseChartType = 'combo';
          break;
        }
    }}

    chartDescription.GoogleChartType = baseChartType;
    chartDescription.options.title = generalProperties.title;

    if (generalProperties.axisNames) {
      chartDescription.options.hAxis.title = generalProperties.axisNames.xaxisName;
      chartDescription.options.vAxis.title = generalProperties.axisNames.yaxisName;
    }

    dataseries.forEach( dataElement => {
      chartDescription.queriesInfo.push(
        new ChartInfo(dataElement, generalProperties.profile, generalProperties.results.resultsLimit));
    });

    return chartObj;
  }

  createDynamicHighChartsChart(generalProperties: any, dataseries: Object[]): HighChartsChart {
    const chartObj = new HighChartsChart();
    chartObj.chartDescription.title.text = generalProperties.title;
    chartObj.chartDescription.exporting.enabled = generalProperties.highchartsOptions.exporting;

    if (generalProperties.axisNames) {
      chartObj.chartDescription.xAxis.title.text = generalProperties.axisNames.xaxisName;
      chartObj.chartDescription.yAxis.title.text = generalProperties.axisNames.yaxisName;
    }

    const queries = new Array<ChartInfo>();

    dataseries.forEach( dataElement => {
      queries.push(new ChartInfo(dataElement, generalProperties.profile, generalProperties.results.resultsLimit));
    });

    chartObj.chartDescription.queries = queries;
    return chartObj;
  }

  set isFormValid(isValid: boolean) { console.log('Form Valid: ' + this._isFormValid); this._isFormValid = isValid; }
  get isFormValid() { return this._isFormValid; }

  errorsChange(arg: any) {
    if (arg.value === null) {
      this.isFormValid = true;
      return;
    }
    this.isFormValid = false;
    console.log('Errors Change: ', arg);
  }

}
