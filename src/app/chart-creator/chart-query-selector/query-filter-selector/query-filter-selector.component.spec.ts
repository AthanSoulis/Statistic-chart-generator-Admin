import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryFilterSelectorComponent } from './query-filter-selector.component';

describe('QueryFilterSelectorComponent', () => {
  let component: QueryFilterSelectorComponent;
  let fixture: ComponentFixture<QueryFilterSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryFilterSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryFilterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
