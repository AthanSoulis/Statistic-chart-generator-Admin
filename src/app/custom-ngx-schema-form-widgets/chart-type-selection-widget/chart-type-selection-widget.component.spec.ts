import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTypeSelectionWidgetComponent } from './chart-type-selection-widget.component';

describe('ChartTypeSelectionWidgetComponent', () => {
  let component: ChartTypeSelectionWidgetComponent;
  let fixture: ComponentFixture<ChartTypeSelectionWidgetComponent>;

  beforeEach(async(() => {
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
