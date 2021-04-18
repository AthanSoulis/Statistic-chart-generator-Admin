import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OperatorSelectionWidgetComponent } from './operator-selection-widget.component';

describe('OperatorSelectionWidgetComponent', () => {
  let component: OperatorSelectionWidgetComponent;
  let fixture: ComponentFixture<OperatorSelectionWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorSelectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorSelectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
