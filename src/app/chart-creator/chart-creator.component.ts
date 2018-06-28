import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Query, Select } from './chart-query-selector/chart-query.model';
import { ChartProperties } from './chart-properties-selector/chart-properties.model';
import { SupportedLibrariesService } from '../supported-libraries-service/supported-libraries.service';
import { HighChartsChart, HCseriesInstance } from '../supported-libraries-service/chart-description-HighCharts.model';
import { GoogleChartsChart } from '../supported-libraries-service/chart-description-GoogleCharts.model';
import { Filter } from './chart-query-selector/query-filter-selector/query-filter/query-filter.model';
import { element } from 'protractor';

declare var jQuery: any;

@Component({
  selector: 'chart-creator',
  templateUrl: './chart-creator.component.html',
  styleUrls: ['./chart-creator.component.css']
})
export class ChartCreatorComponent implements OnInit, AfterViewInit {

  @Output() chartSubmit: EventEmitter<Object> = new EventEmitter();
  @Output() tableSubmit: EventEmitter<Object> = new EventEmitter();
  chartForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private supportedLibrariesService: SupportedLibrariesService) {

    this.createForm();
  }

  createForm() {
    this.chartForm = this.formBuilder.group({
      properties: this.formBuilder.group(new ChartProperties()),
      queryForm: this.formBuilder.group({
        entity: ['', Validators.required],
        selectY: this.formBuilder.group(new Select()),
        selectXs: this.formBuilder.array(new Array<Select>()),
        filters: this.formBuilder.array(new Array<Filter>())
      })
    });

    this.selectXs.push(this.formBuilder.group(new Select()));
    console.log(this.chartForm);
  }

  get properties(): FormGroup { return this.chartForm.get('properties') as FormGroup; }
  get queryForm(): FormGroup { return this.chartForm.get('queryForm') as FormGroup; }
  get selectY(): FormGroup { return this.queryForm.get('selectY') as FormGroup; }
  get selectXs(): FormArray { return this.queryForm.get('selectXs') as FormArray; }
  get filters(): FormArray { return this.queryForm.get('filters') as FormArray; }

  ngOnInit() {}

  onSubmit() {
    console.log(this.chartForm.value);

    let hchartObj = null;
    const library: string = this.properties.get('library').value;
    this.supportedLibrariesService.getSupportedLibraries().subscribe(
      (data: Array<string>) =>  {
        if (data.includes(library)) {

          switch (library) {

            case('HighCharts'): {
              hchartObj = this.createHighChartsChart(this.properties, this.queryForm);

              console.log('Creating a ' + library + ' chart!');
              console.log(hchartObj);
              this.chartSubmit.emit({value: hchartObj});
              break;
            }
            case('GoogleCharts'): {
              const gchartObj = this.createGoogleChartsChart(this.properties, this.queryForm);

              console.log('Creating a ' + library + ' chart!');
              console.log(gchartObj);
              this.chartSubmit.emit({value: gchartObj});
              break;
            }
            default: {}
          }
        }});

    // if (hchartObj === null) { hchartObj = this.createHighChartsChart(this.properties, this.queryForm); }
    // this.tableSubmit.emit({value: hchartObj});
  }

  createGoogleChartsChart(properties: FormGroup, queryForm: FormGroup) {
    const chartObj = new GoogleChartsChart();
    const chartDescription = chartObj.chartDescription;

    chartDescription.queries.push(this.getFormQuery(queryForm));
    chartDescription.GoogleChartType = properties.get('type').value as string;
    chartDescription.columns.push(properties.get('yaxisName').value as string);
    chartDescription.columns.push(properties.get('xaxisName').value as string);

    chartDescription.options.title = properties.get('title').value as string;
    chartDescription.options.hAxis = null;

    if (!chartDescription.chartType || chartDescription.columns || chartDescription.columns.length === 0) {
      console.log('GoogleChart: Something is missing!');
      console.log(chartObj);
      // return null;
    }

    return chartObj;
  }

  createHighChartsChart(properties: FormGroup, queryForm: FormGroup): HighChartsChart {
    const chartObj = new HighChartsChart();
    chartObj.chartDescription.title.text = properties.get('title').value as string;
    chartObj.chartDescription.chart.type = properties.get('type').value as string;
    chartObj.chartDescription.yAxis.title.text = properties.get('yaxisName').value as string;

    const series = new HCseriesInstance(this.getFormQuery(queryForm));
    series.name = properties.get('xaxisName').value as string;

    chartObj.chartDescription.series.push(series);
    return chartObj;
  }

  getFormQuery(queryForm: FormGroup): Query {
    const query = new Query();

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

  ngAfterViewInit(): void {
    jQuery('.tabular.menu .item').tab();
    jQuery('.ui.dropdown').dropdown();
  }

}
