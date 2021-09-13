import { Component, AfterContentInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ObjectLayoutWidget } from 'ngx-schema-form';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'property-widget',
  templateUrl: './property-widget.component.html',
  styleUrls: ['./property-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyWidgetComponent extends ObjectLayoutWidget implements AfterContentInit, OnDestroy {

  private destroyed = false;

  constructor(private cdr: ChangeDetectorRef){ super(); }

  ngAfterContentInit()
  {
    this.formProperty.valueChanges
    .pipe(takeWhile(()=>!this.destroyed))
    .subscribe(val => this.cdr.markForCheck());
  }

  ngOnDestroy()
  {
    this.destroyed = true;
  }

}
