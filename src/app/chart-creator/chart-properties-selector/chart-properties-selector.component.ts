import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroupDirective, ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportedLibrariesService } from '../../supported-libraries-service/supported-libraries.service';
import { ChartProperties } from './chart-properties.model';
import { SupportedChartTypesService } from '../../supported-chart-types-service/supported-chart-types.service';

declare var jQuery: any;

@Component({
  selector: 'chart-properties-selector',
  templateUrl: './chart-properties-selector.component.html',
  styleUrls: ['./chart-properties-selector.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class ChartPropertiesSelectorComponent implements OnDestroy, OnInit, AfterViewInit {

  propertiesForm: FormGroup;
  supportedLibraries: Array<string>;
  supportedChartTypes: Array<string>;
  chartProperties: ChartProperties;

  formPlaceholders = {
    library : '',
    chartTitle : 'Title',
    chartType : ''
  };

  constructor(formBuilder: FormBuilder,
    private librariesService: SupportedLibrariesService,
    private chartTypesService: SupportedChartTypesService) {

    librariesService.getSupportedLibraries().subscribe(
      (data: Array<string>) => this.supportedLibraries = data // success path
        // error => this.error = error // error path
    );

    chartTypesService.getSupportedChartTypes().subscribe(
      (data: Array<string>) => this.supportedChartTypes = data // success path
        // error => this.error = error // error path
    );
  }

  get library() { return this.propertiesForm.get('library'); }
  get chartTitle() { return this.propertiesForm.get('chartTitle'); }
  get chartType() { return this.propertiesForm.get('chartType'); }

  ngOnInit() {
    console.log('Properties Selector initialized');
  }

  ngAfterViewInit(): void {
    jQuery('ui.library.dropdown').dropdown();
    jQuery('ui.chart-type.dropdown').dropdown();
  }

  ngOnDestroy() {
    console.log('Properties Selector destroyed');
  }
}
