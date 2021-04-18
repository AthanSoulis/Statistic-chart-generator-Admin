import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterFieldWidgetComponent } from './filter-field-widget.component';

describe('FilterFieldWidgetComponent', () => {
  let component: FilterFieldWidgetComponent;
  let fixture: ComponentFixture<FilterFieldWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFieldWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFieldWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
