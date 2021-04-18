import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewPropertiesWidgetComponent } from './view-properties-widget.component';

describe('ViewPropertiesWidgetComponent', () => {
  let component: ViewPropertiesWidgetComponent;
  let fixture: ComponentFixture<ViewPropertiesWidgetComponent>;

  beforeEach(waitForAsync(() => {
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
