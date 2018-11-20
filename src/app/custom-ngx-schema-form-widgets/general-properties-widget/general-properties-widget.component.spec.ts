import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPropertiesWidgetComponent } from './general-properties-widget.component';

describe('GeneralPropertiesWidgetComponent', () => {
  let component: GeneralPropertiesWidgetComponent;
  let fixture: ComponentFixture<GeneralPropertiesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralPropertiesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralPropertiesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
