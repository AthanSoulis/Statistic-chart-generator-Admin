import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AutocompleteInputFieldComponent } from './autocomplete-input-field.component';

describe('AutocompleteInputFieldComponent', () => {
  let component: AutocompleteInputFieldComponent;
  let fixture: ComponentFixture<AutocompleteInputFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteInputFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
