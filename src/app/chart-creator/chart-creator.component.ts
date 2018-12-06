import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, AfterContentInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Query, Select, ChartInfo } from './chart-query-selector/chart-query.model';
import { ChartProperties } from './chart-properties-selector/chart-properties.model';
import { SupportedLibrariesService } from '../services/supported-libraries-service/supported-libraries.service';
import { HighChartsChart} from '../services/supported-libraries-service/chart-description-HighCharts.model';
import { GoogleChartsChart } from '../services/supported-libraries-service/chart-description-GoogleCharts.model';
import { Filter } from './chart-query-selector/query-filter-selector/query-filter/query-filter.model';
import { Profile } from '../services/mapping-profiles-service/mapping-profiles.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { FormSchema, SCGAFormSchema, PropertiesFormSchema, DataseriesFormSchema, AppearanceFormSchema } from './chart-form-schema.model';
import { FormComponent } from 'ngx-schema-form';

declare var jQuery: any;

@Component({
  selector: 'chart-creator',
  templateUrl: './chart-creator.component.html',
  styleUrls: ['./chart-creator.component.css']
})
export class ChartCreatorComponent implements OnInit, AfterViewInit, AfterContentInit {

  @Output() chartSubmit: EventEmitter<Object> = new EventEmitter();
  @Output() tableSubmit: EventEmitter<Object> = new EventEmitter();
  @Output() formClear: EventEmitter<Object> = new EventEmitter();
  @Input() loadedChart: Object = null;

  profileMapping: Profile = null;
  public dataseriesTabActive: boolean[] = [];

  fs: FormSchema;
  formValue: SCGAFormSchema;
  formErrors: BehaviorSubject<any>;

  private _isFormValid = true;
  private _resetFormValue = null;

  constructor(private formBuilder: FormBuilder,
    private supportedLibrariesService: SupportedLibrariesService,
    protected cdr: ChangeDetectorRef) {
      this.fs = new FormSchema();
      this.formErrors = new BehaviorSubject(null);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this._resetFormValue = this.formValue;
  }

  ngAfterContentInit(): void {}

  get chartFormValue(): SCGAFormSchema { return this.formValue as SCGAFormSchema; }

  dynamicFormChanged($event) {
    if ($event) {
      this.formValue = $event.value;
    }
  }

  reset(form: FormComponent) {

    form.rootProperty.reset(this._resetFormValue, false);
    this.formClear.emit();
    this.cdr.detectChanges();
  }

  onClear() {
    jQuery('.ui.formClear.modal')
    .modal('show');
  }

  onSubmit() {
    console.log('On Submit called');
    console.log(this.chartFormValue);

    if (this.isFormValid) {

      const chartObj$ = this.createChart();
      chartObj$.subscribe(
        (chartObj: any) => {
          this.chartSubmit.emit({value: chartObj});
          chartObj$.unsubscribe();
        }
      );

      const tableObj$ = this.createTable();
      tableObj$.subscribe(
        (tableObj: any) => {
          this.tableSubmit.emit({value: tableObj});
          tableObj$.unsubscribe();
        }
      );
    }
  }

  createChart(): Subject<Object> {

    const chartObj: Subject<Object> = new Subject();
    const formObj: SCGAFormSchema = this.chartFormValue;

    const generalProperties: PropertiesFormSchema = formObj.generalChartProperties;
    const library: string = formObj.appearance.library;

    const dataseries: DataseriesFormSchema[] = formObj.dataseries;
    const appearanceOptions: AppearanceFormSchema = formObj.appearance;

    this.supportedLibrariesService.getSupportedLibraries().subscribe(
      (data: Array<string>) =>  {
        if (data.includes(library)) {

          switch (library) {

            case('HighCharts'): {
              console.log('Appearance', appearanceOptions);
              const hchartObj = this.createDynamicHighChartsChart(generalProperties, dataseries, appearanceOptions);

              console.log('Creating a ' + library + ' chart!');
              console.log(hchartObj);

              chartObj.next(hchartObj);
              break;
            }
            case('GoogleCharts'): {
              console.log('Appearance', appearanceOptions);
              const gchartObj = this.createDynamicGoogleChartsChart(generalProperties, dataseries, appearanceOptions);

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

  createTable(): Subject<Object> {

    const formObj: SCGAFormSchema = this.chartFormValue;
    const generalProperties: PropertiesFormSchema = formObj.generalChartProperties;
    const dataseries: DataseriesFormSchema[] = formObj.dataseries;

    const tableObj = new GoogleChartsChart();
    const chartDescription = tableObj.chartDescription;

    dataseries.forEach( dataElement => {
      chartDescription.queriesInfo.push(
        new ChartInfo(dataElement, generalProperties.profile, generalProperties.results.resultsLimit));
    });

    return new BehaviorSubject(tableObj);
  }

  createDynamicGoogleChartsChart(generalProperties: PropertiesFormSchema,
    dataseries: DataseriesFormSchema[], appearanceOptions: AppearanceFormSchema): GoogleChartsChart {

    const chartObj = new GoogleChartsChart();
    const chartDescription = chartObj.chartDescription;

    let baseChartType: string;
    if (dataseries.length > 0) {
      baseChartType = dataseries[0].chartProperties.chartType;

      for (let index = 0; index < dataseries.length; index++) {
        const element = dataseries[index];
        if (baseChartType !== element.chartProperties.chartType ) {
          baseChartType = 'combo';
          break;
        }
    }}

    chartDescription.GoogleChartType = baseChartType;
    chartDescription.options.title = generalProperties.title;
    chartDescription.options.exporting = appearanceOptions.googlechartsAppearanceOptions.exporting;

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

  createDynamicHighChartsChart(generalProperties: PropertiesFormSchema,
    dataseries: DataseriesFormSchema[], appearanceOptions: AppearanceFormSchema): HighChartsChart {
    const chartObj = new HighChartsChart();
    chartObj.chartDescription.title.text = generalProperties.title;

    if (appearanceOptions.highchartsAppearanceOptions !== undefined && appearanceOptions.highchartsAppearanceOptions !== null) {
      // Exporting
      chartObj.chartDescription.exporting.enabled = appearanceOptions.highchartsAppearanceOptions.exporting;

      // Legend Options
      chartObj.chartDescription.legend.enabled = appearanceOptions.highchartsAppearanceOptions.hcEnableLegend;
      chartObj.chartDescription.legend.align = appearanceOptions.highchartsAppearanceOptions.hcLegendHorizontalAlignment;
      chartObj.chartDescription.legend.verticalAlign = appearanceOptions.highchartsAppearanceOptions.hcLegendVerticalAlignment;
      chartObj.chartDescription.legend.layout = appearanceOptions.highchartsAppearanceOptions.hcLegendLayout;

      // Credits Options
      chartObj.chartDescription.credits.enabled = appearanceOptions.highchartsAppearanceOptions.hcEnableCredits;
      chartObj.chartDescription.credits.text = appearanceOptions.highchartsAppearanceOptions.hcCreditsText;

      chartObj.chartDescription.subtitle.text = appearanceOptions.highchartsAppearanceOptions.hcSubtitle;
      chartObj.chartDescription.plotOptions.series.dataLabels.enabled = appearanceOptions.highchartsAppearanceOptions.hcEnableDataLabels;

      // Chart Area Options
      chartObj.chartDescription.chart.backgroundColor = appearanceOptions.highchartsAppearanceOptions.hcCABackGroundColor;
      chartObj.chartDescription.chart.borderColor = appearanceOptions.highchartsAppearanceOptions.hcCABorderColor;
      chartObj.chartDescription.chart.borderRadius = appearanceOptions.highchartsAppearanceOptions.hcCABorderCornerRadius;
      chartObj.chartDescription.chart.borderWidth = appearanceOptions.highchartsAppearanceOptions.hcCABorderWidth;

      // Plot Area Options
      chartObj.chartDescription.chart.plotBackgroundColor = appearanceOptions.highchartsAppearanceOptions.hcPABackgroundColor;
      chartObj.chartDescription.chart.plotBackgroundImage = appearanceOptions.highchartsAppearanceOptions.hcPABackgroundImageURL;
      chartObj.chartDescription.chart.plotBorderColor = appearanceOptions.highchartsAppearanceOptions.hcPABorderColor;
      chartObj.chartDescription.chart.plotBorderWidth = appearanceOptions.highchartsAppearanceOptions.hcPABorderWidth;
    }

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

  set isFormValid(isValid: boolean) {
    //  console.log('Form Valid: ' + this._isFormValid);
     this._isFormValid = isValid; }
  get isFormValid() { return this._isFormValid; }

  errorsChange(formErrorsObj: any) {

    this.formErrors.next(formErrorsObj.value);

    if (formErrorsObj.value === null) {
      this.isFormValid = true;
      return;
    }
    this.isFormValid = false;
    // console.log('Errors Change: ', formErrorsObj);
  }

}
