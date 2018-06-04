import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDataPresentationTableRowComponent } from './chart-data-presentation-table-row.component';

describe('ChartDataPresentationTableRowComponent', () => {
  let component: ChartDataPresentationTableRowComponent;
  let fixture: ComponentFixture<ChartDataPresentationTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDataPresentationTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDataPresentationTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
