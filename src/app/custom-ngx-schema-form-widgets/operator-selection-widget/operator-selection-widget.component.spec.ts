import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorSelectionWidgetComponent } from './operator-selection-widget.component';

describe('OperatorSelectionWidgetComponent', () => {
  let component: OperatorSelectionWidgetComponent;
  let fixture: ComponentFixture<OperatorSelectionWidgetComponent>;

  beforeEach(async(() => {
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
