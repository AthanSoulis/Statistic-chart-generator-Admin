import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedLibrariesService } from '../../services/supported-libraries-service/supported-libraries.service';

@Component({
  selector: 'library-selection-widget',
  templateUrl: './library-selection-widget.component.html',
  styleUrls: ['./library-selection-widget.component.css']
})
export class LibrarySelectionWidgetComponent extends ControlWidget implements AfterContentInit {

  supportedLibraries: Array<string>;

  constructor(private librariesService: SupportedLibrariesService) {
    super();
  }

  ngAfterContentInit() {

    this.librariesService.getSupportedLibraries().subscribe(
      // success path
      (data: Array<string>) => this.supportedLibraries = data
        // error => this.error = error // error path
    );
  }
}
