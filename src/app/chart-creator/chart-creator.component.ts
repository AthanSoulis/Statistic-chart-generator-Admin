import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, AfterContentInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Query, Select, ChartInfo } from './chart-query-selector/chart-query.model';
import { ChartProperties } from './chart-properties-selector/chart-properties.model';
import { SupportedLibrariesService } from '../services/supported-libraries-service/supported-libraries.service';
import { HighChartsChart} from '../services/supported-libraries-service/chart-description-HighCharts.model';
import { GoogleChartsChart, GoogleChartsTable } from '../services/supported-libraries-service/chart-description-GoogleCharts.model';
import { Filter } from './chart-query-selector/query-filter-selector/query-filter/query-filter.model';
import { Profile } from '../services/mapping-profiles-service/mapping-profiles.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { FormSchema, SCGAFormSchema, PropertiesFormSchema, DataseriesFormSchema, AppearanceFormSchema } from './chart-form-schema.model';
import { FormComponent } from 'ngx-schema-form';
import { ErrorHandlerService } from '../services/error-handler-service/error-handler.service';

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
    protected errorHandlerService: ErrorHandlerService,
    protected cdr: ChangeDetectorRef) {
      this.fs = new FormSchema();
      this.formErrors = new BehaviorSubject<any>(null);
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
    this.scrollToTop();
  }

  onClear() {
    jQuery('.ui.formClear.modal')
    .modal('show');
  }

  scrollToTop() {
    jQuery('html, body').animate({scrollTop: 0}, 300);
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
          this.scrollToTop();
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
    const library: string = formObj.appearance.chartAppearance.library;

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

    const tableObj = new GoogleChartsTable();

    dataseries.forEach( dataElement => {
      tableObj.tableDescription.queriesInfo.push(
        new ChartInfo(dataElement, generalProperties.profile, generalProperties.results.resultsLimit));
    });

    tableObj.tableDescription.options.pageSize = formObj.appearance.tableAppearance.paginationSize;
    console.log('Page Size:', tableObj.tableDescription.options.pageSize);
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
    chartDescription.options.exporting = appearanceOptions.chartAppearance.googlechartsAppearanceOptions.exporting;
    if (appearanceOptions.chartAppearance.googlechartsAppearanceOptions.gcCABackGroundColor) {
      chartDescription.options.backgroundColor =
        appearanceOptions.chartAppearance.googlechartsAppearanceOptions.gcCABackGroundColor.substring(0, 7);
    }
    if (appearanceOptions.chartAppearance.googlechartsAppearanceOptions.gcPABackgroundColor) {
      chartDescription.options.chartArea.backgroundColor =
      appearanceOptions.chartAppearance.googlechartsAppearanceOptions.gcPABackgroundColor.substring(0, 7);
    }

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

    // tslint:disable-next-line:max-line-length
    if (appearanceOptions.chartAppearance.highchartsAppearanceOptions !== undefined && appearanceOptions.chartAppearance.highchartsAppearanceOptions !== null) {
      // Exporting
      chartObj.chartDescription.exporting.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.exporting;

      // Legend Options
      chartObj.chartDescription.legend.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcEnableLegend;
      chartObj.chartDescription.legend.align = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegendHorizontalAlignment;
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.legend.verticalAlign = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegendVerticalAlignment;
      chartObj.chartDescription.legend.layout = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcLegendLayout;

      // Credits Options
      chartObj.chartDescription.credits.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcEnableCredits;
      chartObj.chartDescription.credits.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCreditsText;

      chartObj.chartDescription.subtitle.text = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcSubtitle;
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.plotOptions.series.dataLabels.enabled = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcEnableDataLabels;

      // Chart Area Options
      chartObj.chartDescription.chart.backgroundColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCABackGroundColor;
      chartObj.chartDescription.chart.borderColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCABorderColor;
      chartObj.chartDescription.chart.borderRadius = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCABorderCornerRadius;
      chartObj.chartDescription.chart.borderWidth = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcCABorderWidth;

      // Plot Area Options
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.chart.plotBackgroundColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPABackgroundColor;
      // tslint:disable-next-line:max-line-length
      chartObj.chartDescription.chart.plotBackgroundImage = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPABackgroundImageURL;
      chartObj.chartDescription.chart.plotBorderColor = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPABorderColor;
      chartObj.chartDescription.chart.plotBorderWidth = appearanceOptions.chartAppearance.highchartsAppearanceOptions.hcPABorderWidth;
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
