import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPropertiesSelectorComponent } from './chart-properties-selector.component';

describe('ChartPropertiesSelectorComponent', () => {
  let component: ChartPropertiesSelectorComponent;
  let fixture: ComponentFixture<ChartPropertiesSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPropertiesSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPropertiesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
