import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChartCreatorComponent } from './chart-creator.component';

describe('ChartCreatorComponent', () => {
  let component: ChartCreatorComponent;
  let fixture: ComponentFixture<ChartCreatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
