import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFieldArrayWidgetComponent } from './filter-field-array-widget.component';

describe('FilterFieldArrayWidgetComponent', () => {
  let component: FilterFieldArrayWidgetComponent;
  let fixture: ComponentFixture<FilterFieldArrayWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFieldArrayWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldArrayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
