import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartQuerySelectorComponent } from './chart-query-selector.component';

describe('ChartQuerySelectorComponent', () => {
  let component: ChartQuerySelectorComponent;
  let fixture: ComponentFixture<ChartQuerySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartQuerySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartQuerySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
