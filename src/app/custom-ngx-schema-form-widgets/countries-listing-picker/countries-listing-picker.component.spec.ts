import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesListingPickerComponent } from './countries-listing-picker.component';

describe('CountriesListingPickerComponent', () => {
  let component: CountriesListingPickerComponent;
  let fixture: ComponentFixture<CountriesListingPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesListingPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesListingPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
