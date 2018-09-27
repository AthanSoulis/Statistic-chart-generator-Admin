import { Component, OnInit, OnDestroy, AfterContentInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { Observable, Subscription, Subject } from 'rxjs';
import { ObjectProperty } from 'ngx-schema-form/lib/model/objectproperty';
import { PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';
import { FieldNode } from '../../services/db-schema-service/db-schema.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'entity-field-selection-widget',
  templateUrl: './entity-field-selection-widget.component.html',
  styleUrls: ['./entity-field-selection-widget.component.css'],
})
export class EntityFieldSelectionWidgetComponent extends ControlWidget implements OnDestroy, AfterContentInit {

  entityValue: string;
  private entitySubscription: Subscription;

  constructor() {
    super();
  }

  ngAfterContentInit() {

    let property = this.formProperty;
    while (property.schema.title !== 'Data Selection') {
      property = property.parent;
    }
    this.entitySubscription = (<PropertyGroup>(<ObjectProperty>(<ObjectProperty>property).getProperty('yaxisData')).getProperty('entity'))
                              .valueChanges.asObservable().pipe(distinctUntilChanged()).subscribe(
                                (data: string) => this.entityValue = data
                              );

  }

  ngOnDestroy() {
    this.entitySubscription.unsubscribe();
  }
}
