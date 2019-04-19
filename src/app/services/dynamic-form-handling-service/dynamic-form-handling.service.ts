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

@Injectable({
  providedIn: 'root'
})
export class DynamicFormHandlingService {

  private _chartObject = undefined;
  private _tableObject = undefined;
  private _resetFormValue = null;
  private _formSchemaObject: BehaviorSubject<SCGAFormSchema>;
  private _formErrorObject: BehaviorSubject<Array<any>> = null;
  private _loadFormObject: Object;
  private _loadFormObjectFile: File = null;

  private _diagramCreator: DiagramCreator;

  constructor(private diagramcategoryService: DiagramCategoryService,
    private chartExportingService: ChartExportingService,
    private chartLoadingService: ChartLoadingService) {

    this._diagramCreator = new DiagramCreator(diagramcategoryService);
    this._formErrorObject = new BehaviorSubject([]);
    this._formSchemaObject = new BehaviorSubject(null);
  }

  set resetFormValue(value: SCGAFormSchema) { this._resetFormValue = value; }
  get isFormValid(): boolean { return this.$formErrorObject.value === null; }
  set formSchemaObject(value: SCGAFormSchema) { this._formSchemaObject.next(value); }
  get formSchemaObject(): SCGAFormSchema { return this._formSchemaObject.getValue(); }
  get diagramCreator(): DiagramCreator { return this.diagramCreator; }
  get $formErrorObject(): BehaviorSubject<Array<any>> { return this._formErrorObject; }
  get ChartObject(): Object { return this._chartObject; }
  get TableObject(): Object { return this._tableObject; }
  get loadFormObject(): Object { return this._loadFormObject; }
  get loadFormObjectFile(): File { return this._loadFormObjectFile; }

  resetForm(root: FormProperty) {
    // Reset through the root property of the dynamic form
    root.reset(this._resetFormValue, false);
    // Reset table and chart objects
    this._tableObject = undefined;
    this._chartObject = undefined;
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
        this._diagramCreator.createTable(value)).subscribe(
          ([chartObject, tableObject]: [Object, Object]) => {
            this._chartObject = chartObject;
            this.chartExportingService.changeChartUrl(chartObject);

            this._tableObject = tableObject;
            this.chartExportingService.changeTableUrl(tableObject);
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
        this._diagramCreator.createTable(value)).subscribe(
          ([chartObject, tableObject]: [Object, Object]) => {
            this.chartExportingService.changeChartUrl(chartObject);

            this.chartExportingService.changeTableUrl(tableObject);
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

}
