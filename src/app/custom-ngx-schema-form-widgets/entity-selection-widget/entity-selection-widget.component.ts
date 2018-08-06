import { Component, AfterViewInit, Injectable, OnChanges, SimpleChanges, AfterContentInit, OnDestroy } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { DbSchemaService } from '../../services/db-schema-service/db-schema.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntitySelectionWidgetService {

  private _entity: Observable<string>;

  constructor() {}

  get entity() {
    return this._entity;
  }

  set entity(entityObservable: Observable<string>) {
    this._entity = entityObservable;
  }
}


@Component({
  selector: 'entity-selection-widget',
  templateUrl: './entity-selection-widget.component.html',
  styleUrls: ['./entity-selection-widget.component.css']
})
export class EntitySelectionWidgetComponent extends ControlWidget implements AfterContentInit {

  entities: Array<string>;

  constructor(private dbSchemaService: DbSchemaService, private entityService: EntitySelectionWidgetService ) {
    super();

    dbSchemaService.getAvailableEntities(null).subscribe(
      (data: Array<string>) => this.entities = data // success path
      // error => this.error = error // error path
    );
  }

  ngAfterContentInit() {

    this.entityService.entity = this.$selectedEntity;
  }

  get $selectedEntity(): Observable<string> {
    return this.formProperty.valueChanges.asObservable();
  }
}
