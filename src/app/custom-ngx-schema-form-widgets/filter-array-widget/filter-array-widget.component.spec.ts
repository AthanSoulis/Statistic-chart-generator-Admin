import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterArrayWidgetComponent } from './filter-array-widget.component';

describe('FilterArrayWidgetComponent', () => {
  let component: FilterArrayWidgetComponent;
  let fixture: ComponentFixture<FilterArrayWidgetComponent>;

  beforeEach(waitForAsync(() => {
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
