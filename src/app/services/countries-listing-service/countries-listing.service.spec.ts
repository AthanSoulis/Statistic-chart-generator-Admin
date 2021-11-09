import { TestBed } from '@angular/core/testing';

import { CountriesListingService } from './countries-listing.service';

describe('CountriesListingService', () => {
  let service: CountriesListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
