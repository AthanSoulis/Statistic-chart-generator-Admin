import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearFormModalComponent } from './clear-form-modal.component';

describe('ClearFormModalComponent', () => {
  let component: ClearFormModalComponent;
  let fixture: ComponentFixture<ClearFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
