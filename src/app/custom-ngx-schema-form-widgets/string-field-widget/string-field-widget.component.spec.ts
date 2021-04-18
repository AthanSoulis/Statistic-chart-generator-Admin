import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StringFieldWidgetComponent } from './string-field-widget.component';

describe('StringFieldWidgetComponent', () => {
  let component: StringFieldWidgetComponent;
  let fixture: ComponentFixture<StringFieldWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StringFieldWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringFieldWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
