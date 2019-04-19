import { Component, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedLibrariesService } from '../../services/supported-libraries-service/supported-libraries.service';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { ISupportedCategory } from '../../services/supported-chart-types-service/supported-chart-types.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'library-selection-widget',
  templateUrl: './library-selection-widget.component.html',
  styleUrls: ['./library-selection-widget.component.css']
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

    this.librariesService.getSupportedLibraries().subscribe(
      // success path
      (data: Array<string>) => this.supportedLibraries = data
        // error => this.error = error // error path
    );

    this.formProperty.root.searchProperty('/category/categoryType').valueChanges.subscribe(
      (categoryType: string) => {
        const availableDiagramsPerCategory =  this.diagramCategoryService.availableDiagrams
        .find((availableDiagram: ISupportedCategory) =>  availableDiagram.type === categoryType);

        if (isNullOrUndefined(availableDiagramsPerCategory)) {
          this.availableLibraries = [];
        } else {
          this.availableLibraries = availableDiagramsPerCategory.supportedLibraries;
          this.formProperty.setValue(this.availableLibraries[0], false);
          this.cdr.markForCheck();
        }
      });
  }
}
