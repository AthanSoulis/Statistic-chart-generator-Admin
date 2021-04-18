import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterPropertyWidgetComponent } from './filter-property-widget.component';

describe('FilterPropertyWidgetComponent', () => {
  let component: FilterPropertyWidgetComponent;
  let fixture: ComponentFixture<FilterPropertyWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPropertyWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPropertyWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
