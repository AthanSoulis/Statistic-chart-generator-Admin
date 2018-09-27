import { Component, AfterViewInit, Injectable, OnChanges, SimpleChanges, AfterContentInit, OnDestroy, forwardRef, Inject, OnInit, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { DbSchemaService } from '../../services/db-schema-service/db-schema.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MappingProfilesService } from '../../services/mapping-profiles-service/mapping-profiles.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'entity-selection-widget',
  templateUrl: './entity-selection-widget.component.html',
  styleUrls: ['./entity-selection-widget.component.css'],
})
export class EntitySelectionWidgetComponent extends ControlWidget implements OnInit, AfterContentInit, OnDestroy {

  @Output() entityChange: EventEmitter<any> = new EventEmitter();

  entities: Array<string>;
  mappingProfileServiceSubscription: Subscription;

  constructor(private dbSchemaService: DbSchemaService, private mappingProfileService: MappingProfilesService) {
    super();
  }

  ngOnInit() {
    this.mappingProfileServiceSubscription = this.mappingProfileService.selectedProfile$
    .subscribe(profile => {

      this.dbSchemaService.getAvailableEntities(profile).pipe(distinctUntilChanged()).subscribe(
        // success path
        (data: Array<string>) => {
          if (!this.mappingProfileService.firstChange) {
             this.formProperty.reset(null, false);
          }
          this.entities = data;
        }
        // error => this.error = error // error path
      );
    });
  }

  ngOnDestroy() {
    this.mappingProfileServiceSubscription.unsubscribe();
  }

  ngAfterContentInit() {}
}
