import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyWidgetComponent } from './property-widget.component';

describe('PropertyWidgetComponent', () => {
  let component: PropertyWidgetComponent;
  let fixture: ComponentFixture<PropertyWidgetComponent>;

  beforeEach(async(() => {
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
