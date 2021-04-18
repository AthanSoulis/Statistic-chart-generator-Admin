import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColorPickerWidgetComponent } from './color-picker-widget.component';

describe('ColorPickerWidgetComponent', () => {
  let component: ColorPickerWidgetComponent;
  let fixture: ComponentFixture<ColorPickerWidgetComponent>;

  beforeEach(waitForAsync(() => {
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
