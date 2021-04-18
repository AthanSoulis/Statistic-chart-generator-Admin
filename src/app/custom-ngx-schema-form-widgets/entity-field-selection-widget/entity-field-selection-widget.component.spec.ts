import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityFieldSelectionWidgetComponent } from './entity-field-selection-widget.component';

describe('EntityFieldSelectionWidgetComponent', () => {
  let component: EntityFieldSelectionWidgetComponent;
  let fixture: ComponentFixture<EntityFieldSelectionWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityFieldSelectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFieldSelectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
