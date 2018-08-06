import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionWidgetComponent } from './selection-widget.component';

describe('SelectionWidgetComponent', () => {
  let component: SelectionWidgetComponent;
  let fixture: ComponentFixture<SelectionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
