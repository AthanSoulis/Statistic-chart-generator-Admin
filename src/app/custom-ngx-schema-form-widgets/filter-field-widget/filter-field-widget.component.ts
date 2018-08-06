import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';
import { EntitySelectionWidgetService } from '../entity-selection-widget/entity-selection-widget.component';

@Component({
  selector: 'filter-field-widget',
  templateUrl: './filter-field-widget.component.html',
  styleUrls: ['./filter-field-widget.component.css']
})
export class FilterFieldWidgetComponent extends ObjectLayoutWidget implements OnDestroy {

  entityValue: string;
  private entitySubscription: Subscription;

  constructor(private entitySelectionService: EntitySelectionWidgetService ) {
    super();

    this.entitySubscription = this.entitySelectionService.entity.subscribe(
      (data: string) => this.entityValue = data
    );
  }

  ngOnDestroy() {
    this.entitySubscription.unsubscribe();
  }
}
