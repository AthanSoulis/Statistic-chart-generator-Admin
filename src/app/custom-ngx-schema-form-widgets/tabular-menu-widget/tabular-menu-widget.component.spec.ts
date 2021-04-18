import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabularMenuWidgetComponent } from './tabular-menu-widget.component';

describe('TabularMenuWidgetComponent', () => {
  let component: TabularMenuWidgetComponent;
  let fixture: ComponentFixture<TabularMenuWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularMenuWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularMenuWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
