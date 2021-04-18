import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeadMenuWidgetComponent } from './head-menu-widget.component';

describe('HeadMenuWidgetComponent', () => {
  let component: HeadMenuWidgetComponent;
  let fixture: ComponentFixture<HeadMenuWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadMenuWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadMenuWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
