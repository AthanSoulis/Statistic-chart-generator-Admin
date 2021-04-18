import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataseriesMenuWidgetComponent } from './dataseries-menu-widget.component';

describe('TabularMenuWidgetComponent', () => {
  let component: DataseriesMenuWidgetComponent;
  let fixture: ComponentFixture<DataseriesMenuWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataseriesMenuWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataseriesMenuWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
