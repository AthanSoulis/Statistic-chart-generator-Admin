import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDataPresentationTableComponent } from './chart-data-presentation-table.component';

describe('ChartDataPresentationTableComponent', () => {
  let component: ChartDataPresentationTableComponent;
  let fixture: ComponentFixture<ChartDataPresentationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDataPresentationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDataPresentationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
