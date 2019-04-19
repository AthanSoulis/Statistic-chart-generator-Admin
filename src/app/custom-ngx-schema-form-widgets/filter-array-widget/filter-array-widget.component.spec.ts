import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterArrayWidgetComponent } from './filter-array-widget.component';

describe('FilterArrayWidgetComponent', () => {
  let component: FilterArrayWidgetComponent;
  let fixture: ComponentFixture<FilterArrayWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterArrayWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterArrayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
