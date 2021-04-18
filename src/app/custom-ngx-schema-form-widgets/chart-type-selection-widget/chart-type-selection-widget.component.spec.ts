import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChartTypeSelectionWidgetComponent } from './chart-type-selection-widget.component';

describe('ChartTypeSelectionWidgetComponent', () => {
  let component: ChartTypeSelectionWidgetComponent;
  let fixture: ComponentFixture<ChartTypeSelectionWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTypeSelectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTypeSelectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
