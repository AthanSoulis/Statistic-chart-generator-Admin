import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerWidgetComponent } from './color-picker-widget.component';

describe('ColorPickerWidgetComponent', () => {
  let component: ColorPickerWidgetComponent;
  let fixture: ComponentFixture<ColorPickerWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPickerWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
