import { Component, AfterViewInit, Injectable, OnChanges, SimpleChanges, AfterContentInit, OnDestroy, forwardRef, Inject } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { DbSchemaService } from '../../services/db-schema-service/db-schema.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'entity-selection-widget',
  templateUrl: './entity-selection-widget.component.html',
  styleUrls: ['./entity-selection-widget.component.css']
})
export class EntitySelectionWidgetComponent extends ControlWidget implements AfterContentInit {

  entities: Array<string>;

  constructor(private dbSchemaService: DbSchemaService) {
    super();

    dbSchemaService.getAvailableEntities(null).subscribe(
      (data: Array<string>) => this.entities = data // success path
      // error => this.error = error // error path
    );
  }

  ngAfterContentInit() {}
}
