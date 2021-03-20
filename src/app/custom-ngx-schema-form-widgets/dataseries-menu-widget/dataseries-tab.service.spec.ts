import { TestBed } from '@angular/core/testing';

import { DataseriesTabService } from './dataseries-tab.service';

describe('DataseriesTabService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataseriesTabService = TestBed.get(DataseriesTabService);
    expect(service).toBeTruthy();
  });
});
