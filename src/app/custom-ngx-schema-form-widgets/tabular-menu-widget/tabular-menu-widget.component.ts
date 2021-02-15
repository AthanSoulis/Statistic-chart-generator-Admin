import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';

@Component({
  selector: 'tabular-menu-widget',
  templateUrl: './tabular-menu-widget.component.html',
  styleUrls: ['./tabular-menu-widget.component.scss']
})
export class TabularMenuWidgetComponent extends ObjectLayoutWidget implements AfterContentInit {

  ngAfterContentInit() {
  }

  trackByIndex(index: number, item: any) {
    return item;
  }
}
