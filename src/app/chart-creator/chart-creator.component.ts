import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Query, Select } from './chart-query-selector/chart-query.model';
import { ChartProperties } from './chart-properties-selector/chart-properties.model';
import { SupportedLibrariesService } from '../services/supported-libraries-service/supported-libraries.service';
import { HighChartsChart, HCqueriesInstance } from '../services/supported-libraries-service/chart-description-HighCharts.model';
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

  chartForm: FormGroup;
  profileMapping: Profile = null;
  public dataseriesTabActive: boolean[] = [];

  fs: FormSchema;
  formValue: string;

  constructor(private formBuilder: FormBuilder,
    private supportedLibrariesService: SupportedLibrariesService) {
      this.fs = new FormSchema();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.chartForm = this.formBuilder.group({
      properties: this.formBuilder.group(new ChartProperties()),
      dataseries: this.formBuilder.array(new Array<FormGroup>())
    });

    console.log(this.chartForm);
  }

  addDataseries() {
    this.dataseries.push(
        this.formBuilder.group({
        entity: [null, Validators.required],
        selectY: this.formBuilder.group(new Select()),
        selectXs: this.formBuilder.array(new Array<Select>()),
        filters: this.formBuilder.array(new Array<Filter>())})
    );

    this.getSelectXs(this.dataseries.length - 1).push(this.formBuilder.group(new Select()));

    this.dataseriesTabActive.push(true);
    console.log('Added dataseries: ' + this.dataseries.length);
  }

  removeDataseries(index: number) {
    if (index > -1) {
      this.dataseries.removeAt(index);
      this.dataseriesTabActive.splice(index, 1);
    }
  }

  get chartFormValue(): Object { return this.formValue as Object; }
// get chartFormValue(): Object { return this.chartForm.value as Object; }
  get properties(): FormGroup { return this.chartForm.get('properties') as FormGroup; }
  get dataseries(): FormArray { return this.chartForm.get('dataseries') as FormArray; }
  getQueryForm(index: number): FormGroup { return this.dataseries.at(index) as FormGroup; }
  getSelectY(index: number): FormGroup { return this.getQueryForm(index).get('selectY') as FormGroup; }
  getSelectXs(index: number): FormArray { return this.getQueryForm(index).get('selectXs') as FormArray; }
  getFilters(index: number): FormArray { return this.getQueryForm(index).get('filters') as FormArray; }

  profileMappingChanged($event) {
    console.log(event);
    this.profileMapping = this.properties.get('profile').value;
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
              const gchartObj = this.createGoogleChartsChart(this.properties, this.getQueryForm(0));

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

    chartDescription.queries.push(this.getFormQuery(queryForm));
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

  createDynamicHighChartsChart(generalProperties: any, dataseries: Object[]): HighChartsChart {
    const chartObj = new HighChartsChart();
    chartObj.chartDescription.title.text = generalProperties.title;
    chartObj.chartDescription.xAxis.title.text = generalProperties.axisNames.xaxisName;
    chartObj.chartDescription.yAxis.title.text = generalProperties.axisNames.yaxisName;

    const queries = new Array<HCqueriesInstance>();

    dataseries.forEach( dataElement => {
      queries.push(new HCqueriesInstance(dataElement));
    });

    chartObj.chartDescription.queries = queries;
    return chartObj;
  }

  // TODO This does NOT take into account multiple Dataseries
  createHighChartsChart(properties: FormGroup, queryForm: FormGroup): HighChartsChart {
    const chartObj = new HighChartsChart();
    chartObj.chartDescription.title.text = properties.get('title').value as string;
    chartObj.chartDescription.chart.type = properties.get('type').value as string;
    chartObj.chartDescription.yAxis.title.text = properties.get('yaxisName').value as string;
    chartObj.chartDescription.xAxis.title.text = properties.get('xaxisName').value as string;

    const series = new HCqueriesInstance(this.getFormQuery(queryForm));

    chartObj.chartDescription.queries.push(series);
    return chartObj;
  }

  getFormQuery(queryForm: FormGroup): Query {
    const query = new Query(null);

    query.entity = queryForm.get('entity').value as string;

    const selectXs = queryForm.get('selectXs').value as Array<Select>;
    selectXs.forEach(selectElement => {
      query.select.push(selectElement);
    });

    if (queryForm.get('selectY').get('aggregate').value === 'total') {
      const totalSelectY = new Select();
      totalSelectY.field = queryForm.get('entity').value;
      totalSelectY.aggregate = 'count';

      query.select.push(totalSelectY);
    } else {
      query.select.push(queryForm.get('selectY').value);
    }

    const filters = queryForm.get('filters').value as Array<Filter>;
    filters.forEach(filterElement => {
      query.filters.push(filterElement);
    });

    return query;
  }

  isFormInvalid(): boolean {
    return false; // this.chartForm.invalid && (this.chartForm.touched || this.chartForm.dirty);
  }

  ngAfterViewInit(): void {}

}
