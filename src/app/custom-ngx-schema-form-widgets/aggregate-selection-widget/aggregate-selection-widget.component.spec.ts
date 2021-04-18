import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AggregateSelectionWidgetComponent } from './aggregate-selection-widget.component';

describe('AggregateSelectionWidgetComponent', () => {
  let component: AggregateSelectionWidgetComponent;
  let fixture: ComponentFixture<AggregateSelectionWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregateSelectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateSelectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
