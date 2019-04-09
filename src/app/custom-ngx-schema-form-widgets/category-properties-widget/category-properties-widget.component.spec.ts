import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPropertiesWidgetComponent } from './category-properties-widget.component';

describe('CategoryPropertiesWidgetComponent', () => {
  let component: CategoryPropertiesWidgetComponent;
  let fixture: ComponentFixture<CategoryPropertiesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPropertiesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPropertiesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
