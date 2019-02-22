import { Component, OnInit, OnDestroy, AfterContentInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ControlWidget, ObjectLayoutWidget } from 'ngx-schema-form';
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
export class EntityFieldSelectionWidgetComponent extends ControlWidget implements OnDestroy, AfterContentInit, AfterViewInit {

  entityValue: string;
  private subscriptions: Subscription[] = [];
  entityFieldDisabled = true;

  constructor() {
    super();
  }

  ngAfterContentInit() {

    // Find the FormProperty named 'data'
    let property = <PropertyGroup>this.formProperty;
    while (property.schema.title !== 'Data Selection') {
      // lulz
      property = property.parent;
    }
    this.subscriptions.push(
    property.getProperty('yaxisData/entity').valueChanges.pipe(distinctUntilChanged()).subscribe(
                (data: string) => {
                    // Acquire this dataseries' entity if its valid
                    if (data) {
                      this.entityValue = data;
                      return;
                    }
                    // Else, reset the value of the form
                    this.entityValue = null;
                    this.control.reset();
                  })
    );
    // this.subscriptions.push(
    //   property.getProperty('yaxisData/yaxisAggregate').valueChanges.pipe(distinctUntilChanged()).subscribe(
    //     (aggregate: string) => {
    //       if (aggregate === 'total' || aggregate === null || aggregate === undefined) {
    //         this.entityFieldDisabled = true;
    //         return;
    //       }
    //       this.entityFieldDisabled = false;
    //     })
    // );

    this.subscriptions.push(
      this.control.valueChanges.subscribe(
      (value) => {
        console.log('Errors: ', this.control.errors);
      })
    );
  }

  ngOnDestroy() {
    console.log('Entity Field Destroyed');
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
    this.subscriptions = null;
  }
}
