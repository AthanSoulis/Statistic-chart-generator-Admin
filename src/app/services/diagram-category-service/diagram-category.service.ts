import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    SupportedChartTypesService,
    ISupportedMap,
    ISupportedSpecialChartType,
    ISupportedChart,
    ISupportedCategory,
    ISupportedMiscType
} from '../supported-chart-types-service/supported-chart-types.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DiagramCategoryService {

  public selectedDiagramCategory$: BehaviorSubject<string>;

  supportedChartTypes: Array<ISupportedChart> = [];
  supportedMaps: Array<ISupportedMap> = [];
  supportedSpecialisedDiagrams: Array<ISupportedSpecialChartType> = [];
  supportedMiscTypes: Array<ISupportedMiscType> = [];

  availableDiagrams: Array<ISupportedCategory> = [];

  constructor(private chartTypesService: SupportedChartTypesService) {

    this.chartTypesService.getSupportedChartTypes().subscribe(
      (data: Array<ISupportedChart>) => this.supportedChartTypes = data, // success path
      error => {}, // error path
      () => {
        this.supportedChartTypes
        .map((elem: ISupportedChart) => this.availableDiagrams.push(elem));
      }
    );
    this.chartTypesService.getSupportedMaps().subscribe(
      (data: Array<ISupportedMap>) => {
        this.supportedMaps = data;
      }, // success path
      error => {}, // error path
      () => {
        this.supportedMaps
        .map((elem: ISupportedChart) => this.availableDiagrams.push(elem));
      }
    );
    this.chartTypesService.getSupportedSpecialChartTypes().subscribe(
      (data: Array<ISupportedSpecialChartType>) => {
        this.supportedSpecialisedDiagrams = data;
      }, // success path
      error => {}, // error path
      () => {
        this.supportedSpecialisedDiagrams
        .map((elem: ISupportedChart) => this.availableDiagrams.push(elem) );
      }
    );
    this.chartTypesService.getSupportedMiscTypes().subscribe(
        (data: Array<ISupportedMiscType>) => {
              this.supportedMiscTypes = data;
          }, // success path
          error => {}, // error path
          () => {
              this.supportedMiscTypes
                  .map((elem: ISupportedChart) => this.availableDiagrams.push(elem) );
        }
    );

    this.selectedDiagramCategory$ = new BehaviorSubject(null);
  }

  public changeDiagramCategory(diagramCategory: string) {
      const found = this.availableDiagrams.find(
        (availableDiagram: ISupportedCategory) => availableDiagram.type === diagramCategory);
      this.selectedDiagramCategory$.next(isNullOrUndefined(found) ? null : found.type);

      if (found) {
        console.log('Changed to:', diagramCategory);
      } else {
        console.log(diagramCategory + 'diagram not found among:', this.availableDiagrams );
      }
  }
}
