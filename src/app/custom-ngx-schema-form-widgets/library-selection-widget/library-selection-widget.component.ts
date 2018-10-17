import { Component, OnInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedLibrariesService } from '../../services/supported-libraries-service/supported-libraries.service';

@Component({
  selector: 'library-selection-widget',
  templateUrl: './library-selection-widget.component.html',
  styleUrls: ['./library-selection-widget.component.css']
})
export class LibrarySelectionWidgetComponent extends ControlWidget {

  supportedLibraries: Array<string>;

  constructor(private librariesService: SupportedLibrariesService) {
    super();
    librariesService.getSupportedLibraries().subscribe(
      (data: Array<string>) => this.supportedLibraries = data // success path
        // error => this.error = error // error path
    );
  }
}
