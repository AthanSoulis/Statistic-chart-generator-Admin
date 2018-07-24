import { TestBed, inject } from '@angular/core/testing';

import { SupportedAggregateFunctionsService } from './supported-aggregate-functions.service';

describe('SupportedAggregateFunctionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportedAggregateFunctionsService]
    });
  });

  it('should be created', inject([SupportedAggregateFunctionsService], (service: SupportedAggregateFunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
