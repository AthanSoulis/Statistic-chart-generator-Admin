import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramCategoryPickerComponent } from './diagram-category-picker.component';

describe('DiagramCategoryPickerComponent', () => {
  let component: DiagramCategoryPickerComponent;
  let fixture: ComponentFixture<DiagramCategoryPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramCategoryPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramCategoryPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
