import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { EntitySelectionWidgetService } from '../entity-selection-widget/entity-selection-widget.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'entity-field-selection-widget',
  templateUrl: './entity-field-selection-widget.component.html',
  styleUrls: ['./entity-field-selection-widget.component.css']
})
export class EntityFieldSelectionWidgetComponent extends ControlWidget implements OnDestroy {

  entityValue: string;
  private entitySubscription: Subscription;

  constructor( private entitySelectionService: EntitySelectionWidgetService ) {
    super();

    this.entitySubscription = this.entitySelectionService.entity.subscribe(
      (data: string) => this.entityValue = data
    );
  }

  ngOnDestroy() {
    this.entitySubscription.unsubscribe();
  }
}
