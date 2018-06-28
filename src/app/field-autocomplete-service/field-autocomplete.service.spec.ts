import { TestBed, inject } from '@angular/core/testing';

import { FieldAutocompleteService } from './field-autocomplete.service';

describe('FieldAutocompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldAutocompleteService]
    });
  });

  it('should be created', inject([FieldAutocompleteService], (service: FieldAutocompleteService) => {
    expect(service).toBeTruthy();
  }));
});
