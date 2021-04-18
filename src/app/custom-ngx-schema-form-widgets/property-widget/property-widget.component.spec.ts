import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PropertyWidgetComponent } from './property-widget.component';

describe('PropertyWidgetComponent', () => {
  let component: PropertyWidgetComponent;
  let fixture: ComponentFixture<PropertyWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
