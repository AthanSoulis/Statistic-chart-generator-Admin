import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataseriesMenuWidgetComponent } from './dataseries-menu-widget.component';

describe('TabularMenuWidgetComponent', () => {
  let component: DataseriesMenuWidgetComponent;
  let fixture: ComponentFixture<DataseriesMenuWidgetComponent>;

  beforeEach(async(() => {
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
