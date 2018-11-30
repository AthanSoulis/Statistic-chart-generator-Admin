import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberFieldWidgetComponent } from './number-field-widget.component';

describe('NumberFieldWidgetComponent', () => {
  let component: NumberFieldWidgetComponent;
  let fixture: ComponentFixture<NumberFieldWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberFieldWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberFieldWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
