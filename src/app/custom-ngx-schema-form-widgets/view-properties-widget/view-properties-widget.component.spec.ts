import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertiesWidgetComponent } from './view-properties-widget.component';

describe('ViewPropertiesWidgetComponent', () => {
  let component: ViewPropertiesWidgetComponent;
  let fixture: ComponentFixture<ViewPropertiesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPropertiesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPropertiesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
