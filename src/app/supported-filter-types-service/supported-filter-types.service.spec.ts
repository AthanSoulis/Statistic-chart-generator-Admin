import { TestBed, inject } from '@angular/core/testing';

import { SupportedFilterTypesService } from './supported-filter-types.service';

describe('SupportedFilterTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportedFilterTypesService]
    });
  });

  it('should be created', inject([SupportedFilterTypesService], (service: SupportedFilterTypesService) => {
    expect(service).toBeTruthy();
  }));
});
