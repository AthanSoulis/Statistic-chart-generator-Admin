import { ISupportedPolar, ISupportedMap } from './../../services/supported-chart-types-service/supported-chart-types.service';
import { Component, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedLibrariesService } from '../../services/supported-libraries-service/supported-libraries.service';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { ISupportedCategory } from '../../services/supported-chart-types-service/supported-chart-types.service';
import { first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'library-selection-widget',
  templateUrl: './library-selection-widget.component.html',
  styleUrls: ['./library-selection-widget.component.scss']
})
export class LibrarySelectionWidgetComponent extends ControlWidget implements AfterContentInit {

  supportedLibraries: Array<string>;
  availableLibraries: Array<string>;

  constructor(private librariesService: SupportedLibrariesService,
    private diagramCategoryService: DiagramCategoryService,
    private cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterContentInit() {

    this.librariesService.getSupportedLibraries().pipe(first()).subscribe((data: Array<string>) => this.supportedLibraries = data);

    this.formProperty.root.searchProperty('/category/categoryType').valueChanges.subscribe(
      (categoryType:string) => {

        const availableDiagramsPerCategory =  this.diagramCategoryService.availableDiagrams
        .find((availableDiagram: ISupportedCategory) => availableDiagram.type === categoryType );

        if (availableDiagramsPerCategory == null) {
          this.availableLibraries = [];
        } else {
          this.availableLibraries = availableDiagramsPerCategory.supportedLibraries;
          this.formProperty.setValue(this.availableLibraries[0], false);
        }
        this.cdr.markForCheck();
      });
  }
}
