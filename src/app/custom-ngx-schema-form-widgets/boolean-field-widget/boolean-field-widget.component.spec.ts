import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanFieldWidgetComponent } from './boolean-field-widget.component';

describe('BooleanFieldWidgetComponent', () => {
  let component: BooleanFieldWidgetComponent;
  let fixture: ComponentFixture<BooleanFieldWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanFieldWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanFieldWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
