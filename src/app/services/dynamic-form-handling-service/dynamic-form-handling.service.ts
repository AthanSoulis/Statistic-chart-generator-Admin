import { Injectable } from '@angular/core';
import { SCGAFormSchema } from '../../chart-creator/chart-form-schema.classes';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { DiagramCreator } from './dynamic-form-handling-diagram-creator';
import { SupportedLibrariesService } from '../supported-libraries-service/supported-libraries.service';
import { ChartExportingService } from '../chart-exporting-service/chart-exporting.service';
import { ChartLoadingService } from '../chart-loading-service/chart-loading.service';
import { isNullOrUndefined } from 'util';
import { DiagramCategoryService } from '../diagram-category-service/diagram-category.service';
import {FormSchema} from '../../chart-creator/chart-form-schema.model';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormHandlingService {

  private _chartObject = undefined;
  private _tableObject = undefined;
  private _rawDataObject = undefined;
  private _resetFormValue = null;
  private _formSchemaObject: BehaviorSubject<SCGAFormSchema>;
  private _formErrorObject: BehaviorSubject<Array<any>> = null;
  private _loadFormObject: Object;
  private _loadFormObjectFile: File = null;

  private _diagramCreator: DiagramCreator;

  private _formSchema: FormSchema;

  // fixme when find another solution
  private xAxisRequirement: boolean;

  constructor(private diagramcategoryService: DiagramCategoryService,
    private chartExportingService: ChartExportingService,
    private chartLoadingService: ChartLoadingService) {

    this._diagramCreator = new DiagramCreator(diagramcategoryService);
    this._formErrorObject = new BehaviorSubject([]);
    this._formSchemaObject = new BehaviorSubject(null);

    this._formSchema = new FormSchema();
  }

  set resetFormValue(value: SCGAFormSchema) { this._resetFormValue = value; }
  get isFormValid(): boolean {
    if (this.$formErrorObject.value === null) {
      return true;
    } else if (!this.xAxisRequirement && this._formErrorObject.value.length === 1
        && this._formErrorObject.getValue()[0].code === 'ARRAY_LENGTH_SHORT'
        && this._formErrorObject.getValue()[0].path === '#/dataseries/0/data/xaxisData') {
      return true;
    } else {
      return false;
    }
    // return this.$formErrorObject.value === null;
  }
  set formSchemaObject(value: SCGAFormSchema) { this._formSchemaObject.next(value); }
  get formSchemaObject(): SCGAFormSchema { return this._formSchemaObject.getValue(); }
  get diagramCreator(): DiagramCreator { return this.diagramCreator; }
  get $formErrorObject(): BehaviorSubject<Array<any>> { return this._formErrorObject; }
  get ChartObject(): Object { return this._chartObject; }
  get TableObject(): Object { return this._tableObject; }
  get RawDataObject(): Object { return this._rawDataObject; }
  get loadFormObject(): Object { return this._loadFormObject; }
  get loadFormObjectFile(): File { return this._loadFormObjectFile; }
  get formSchema(): FormSchema { return this._formSchema; }

  resetForm(root: FormProperty) {
    // Reset through the root property of the dynamic form
    root.reset(this._resetFormValue, false);
    // Reset table and chart objects
    this._tableObject = undefined;
    this._chartObject = undefined;
    this._rawDataObject = undefined;
  }

  loadForm(event: any) {
    // console.log('Load Event', event);
    this._loadFormObjectFile = null;

    if (!isNullOrUndefined(event) ) {
      const fr: FileReader = new FileReader();

      fr.onload = () => {
        this._loadFormObject = JSON.parse(<string>fr.result);
      };
      fr.onloadstart = () => { this.chartLoadingService.chartLoadingStatus = true;  };
      fr.onloadend = () => {
        this._loadFormObjectFile = event.target.files[0];
      };

      fr.readAsText(event.target.files[0]);
    }
  }
  submitForm() {
    console.log('Submitted this form', this.formSchemaObject);
    const value = this.formSchemaObject;
    if (this.formSchemaObject !== null && this.isFormValid) {

      const forkSub = forkJoin(
          this._diagramCreator.createChart(value),
          this._diagramCreator.createTable(value),
          this._diagramCreator.createRawData(value)).subscribe(
          ([chartObject, tableObject, rawDataObject]: [Object, Object, Object]) => {
            this._chartObject = chartObject;
            this.chartExportingService.changeChartUrl(chartObject);

            this._tableObject = tableObject;
            this.chartExportingService.changeTableUrl(tableObject);

            this._rawDataObject = rawDataObject;
            this.chartExportingService.changeRawDataUrl(rawDataObject);
          },
          () => {
            forkSub.unsubscribe(); }
        );
    }
  }
  publishURLS() {
    console.log('Publish this form', this.formSchemaObject);
    const value = this.formSchemaObject;
    if (this.formSchemaObject !== null && this.isFormValid) {

      const forkSub = forkJoin(
          this._diagramCreator.createChart(value),
          this._diagramCreator.createTable(value),
          this._diagramCreator.createRawData(value)).subscribe(
            ([chartObject, tableObject, rawDataObj]: [Object, Object, Object]) => {
              this.chartExportingService.changeChartUrl(chartObject);

              this.chartExportingService.changeTableUrl(tableObject);

              this.chartExportingService.changeRawDataUrl(rawDataObj);
            },
            () => {
              forkSub.unsubscribe(); }
          );
    }
  }
  exportForm() {
    this.createAndDownloadJSON(this.formSchemaObject, 'chart.json');
  }
  createAndDownloadJSON(jsonObj: Object, filename: string) {

    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonObj)));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }

  changeRequirementOfXAxis(required: boolean) {
    if (required) {
      this.xAxisRequirement = true;
      this._formSchema.dataseriesFormSchema.items.properties.data.fieldsets[0].fields = ['yaxisData', 'xaxisData'];
      this._formSchema.dataseriesFormSchema.items.properties.data.required = ['yAxisData', 'xAxisData', 'filters'];
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.items.required = ['xaxisEntityField'];
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.minItems = 1;
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.items.properties.xaxisEntityField.requiredField = true;
    } else {
      this.xAxisRequirement = false;
      // this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.widget = 'hidden';
      this._formSchema.dataseriesFormSchema.items.properties.data.fieldsets[0].fields = ['yaxisData'];
      this._formSchema.dataseriesFormSchema.items.properties.data.required = ['yAxisData', 'filters'];
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.items.required = [];
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.minItems = 0;
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.items.properties.xaxisEntityField.requiredField = false;
    }
  }

  printLogs() {
    console.log('this._formSchema --> ', this._formSchema);
    console.log('this._formErrorObject -->', this._formErrorObject);
  }

  // removeXAxisErrorForNumbers() {
  //     if (!this.xAxisRequirement && this._formErrorObject.value.length > 0) {
  //         // for (const value of this._formErrorObject.getValue()) {
  //         //     console.log('error value -->', value);
  //         //     if (value.code === 'ARRAY_LENGTH_SHORT' && value.path === '#/dataseries/0/data/xaxisData') {
  //         //         console.log('found the error to remove');
  //         //         const index = this._formErrorObject.getValue().indexOf(value, 0);
  //         //         if (index > -1) {
  //         //             this._formErrorObject.getValue().splice(index, 1);
  //         //         }
  //         //         console.log('this._formErrorObject.getValue() NEW -->', this._formErrorObject.getValue());
  //         //     }
  //         // }
  //         console.log('this._formErrorObject OLD -->', this._formErrorObject);
  //         this._formErrorObject.getValue().forEach( (item, index) => {
  //             console.log('error value -->', item);
  //             if (item.code === 'ARRAY_LENGTH_SHORT' && item.path === '#/dataseries/0/data/xaxisData') {
  //                 if (index > -1) {
  //                     this._formErrorObject.getValue().splice(index, 1);
  //                 }
  //                 console.log('error found at index -->', index);
  //                 console.log('this._formErrorObject NEW -->', this._formErrorObject);
  //             }
  //         });
  //     }
  // }

}
