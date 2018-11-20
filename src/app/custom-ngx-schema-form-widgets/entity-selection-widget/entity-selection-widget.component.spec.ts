import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySelectionWidgetComponent } from './entity-selection-widget.component';

describe('EntitySelectionWidgetComponent', () => {
  let component: EntitySelectionWidgetComponent;
  let fixture: ComponentFixture<EntitySelectionWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySelectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySelectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
