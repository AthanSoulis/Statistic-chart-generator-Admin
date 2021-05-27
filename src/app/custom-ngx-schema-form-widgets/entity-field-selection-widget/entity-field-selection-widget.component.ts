import { Component, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { Subscription } from 'rxjs';
import { PropertyGroup } from 'ngx-schema-form/lib/model/formproperty';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'entity-field-selection-widget',
  templateUrl: './entity-field-selection-widget.component.html',
  styleUrls: ['./entity-field-selection-widget.component.scss'],
})
export class EntityFieldSelectionWidgetComponent extends ControlWidget implements OnDestroy, AfterContentInit, AfterViewInit {

  entityValue: string|null = null;
  private subscriptions: Subscription[] = [];
  entityFieldDisabled = true;

  constructor() {
    super();
  }

  ngAfterContentInit() {

    // Find the FormProperty named 'data'
    let property = <PropertyGroup>this.formProperty;
    while ( property.properties['yaxisData'] === null || property.properties['yaxisData'] === undefined ) {
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
    this.subscriptions = [];
  }
}
