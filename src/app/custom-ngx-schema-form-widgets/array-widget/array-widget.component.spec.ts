import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArrayWidgetComponent } from './array-widget.component';

describe('ArrayWidgetComponent', () => {
  let component: ArrayWidgetComponent;
  let fixture: ComponentFixture<ArrayWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
