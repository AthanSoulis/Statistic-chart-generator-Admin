import { Component, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedLibrariesService } from '../../services/supported-libraries-service/supported-libraries.service';
import { ISupportedCategory } from '../../services/supported-chart-types-service/supported-chart-types.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'library-selection-widget',
  templateUrl: './library-selection-widget.component.html',
  styleUrls: ['./library-selection-widget.component.scss']
})
export class LibrarySelectionWidgetComponent extends ControlWidget implements AfterContentInit {

  supportedLibraries: Array<string>;
  availableLibraries: Array<string>;

  constructor(private librariesService: SupportedLibrariesService, private cdr: ChangeDetectorRef) { super(); }

  ngAfterContentInit() {

    this.librariesService.getSupportedLibraries().pipe(first()).subscribe((data: Array<string>) => this.supportedLibraries = data);

    this.formProperty.root.searchProperty('/category/diagram').valueChanges.subscribe(
      (selectedDiagram: ISupportedCategory) => {

        if (selectedDiagram.supportedLibraries != null && selectedDiagram.supportedLibraries.length > 0)
        {
          this.availableLibraries = selectedDiagram.supportedLibraries;
          this.formProperty.setValue(this.availableLibraries[0], false);
        }
        else
          this.availableLibraries = [];

        this.cdr.markForCheck();
      });
  }
}
