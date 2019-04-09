import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupportedChartTypesService } from '../supported-chart-types-service/supported-chart-types.service';

@Injectable({
  providedIn: 'root'
})
export class DiagramCategoryService {

  public selectedDiagramCategory$: BehaviorSubject<string>;

  supportedChartTypes: Array<string> = [];
  supportedMaps: Array<string> = [];
  supportedSpecialisedDiagrams: Array<string> = [];

  availableDiagrams: Array<string> = [];

  constructor(private chartTypesService: SupportedChartTypesService) {

    chartTypesService.getSupportedChartTypes().subscribe(
      (data: Array<string>) => this.supportedChartTypes = data, // success path
      error => {}, // error path
      () => {
        this.availableDiagrams = this.supportedChartTypes;
      }
    );
    this.selectedDiagramCategory$ = new BehaviorSubject(null);
    // this.availableDiagrams.concat(this.supportedChartTypes, this.supportedMaps, this.supportedSpecialisedDiagrams);
  }

  public changeDiagramCategory(diagramCategory: string) {
    const found = this.availableDiagrams.find(
      (availableDiagram: string) => availableDiagram === diagramCategory);
    this.selectedDiagramCategory$.next(found);

    // if (found) {
    //   console.log('Changed to:', diagramCategory);
    // } else {
    //   console.log(diagramCategory + 'Not found among:', this.availableDiagrams );
    // }
  }
}
