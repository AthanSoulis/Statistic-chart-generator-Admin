import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Query, Select } from './chart-query-selector/chart-query.model';
import { ChartProperties } from './chart-properties-selector/chart-properties.model';
import { SupportedLibrariesService } from '../supported-libraries-service/supported-libraries.service';
import { HighChartsChart, HCseriesInstance } from '../supported-libraries-service/chart-description-HighCharts.model';
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

    const library: string = this.properties.get('library').value;
    this.supportedLibrariesService.getSupportedLibraries().subscribe(
      (data: Array<string>) =>  {
        if (data.includes(library)) {

          switch (library) {

            case('HighCharts'): {
              const chartObj = new HighChartsChart();
              chartObj.chartDescription.title.text = this.properties.get('title').value as string;
              chartObj.chartDescription.chart.type = this.properties.get('type').value as string;

              const series = new HCseriesInstance();
              series.query.entity = this.queryForm.get('entity').value as string;

              const selectXs = this.queryForm.get('selectXs').value as Array<Select>;
              selectXs.forEach(selectElement => {
                series.query.select.push(selectElement);
              });

              series.query.select.push(this.queryForm.get('selectY').value);

              const filters = this.queryForm.get('filters').value as Array<Filter>;
              filters.forEach(filterElement => {
                series.query.filters.push(filterElement);
              });

              chartObj.chartDescription.series.push(series);

              console.log('Creating a ' + library + ' chart!');
              console.log(chartObj);
              this.chartSubmit.emit({value: chartObj});
              break;
            }
            case('GoogleCharts'): {
              console.log('Creating a ' + library + ' chart!');
              break;
            }
            default: {}
          }
        }});
  }

  isFormInvalid(): boolean {
    return false; // this.chartForm.invalid && (this.chartForm.touched || this.chartForm.dirty);
  }

  ngAfterViewInit(): void {
    jQuery('.tabular.menu .item').tab();
    jQuery('.ui.dropdown').dropdown();
  }

}
