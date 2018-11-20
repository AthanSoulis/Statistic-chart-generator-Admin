import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadMenuWidgetComponent } from './head-menu-widget.component';

describe('HeadMenuWidgetComponent', () => {
  let component: HeadMenuWidgetComponent;
  let fixture: ComponentFixture<HeadMenuWidgetComponent>;

  beforeEach(async(() => {
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
