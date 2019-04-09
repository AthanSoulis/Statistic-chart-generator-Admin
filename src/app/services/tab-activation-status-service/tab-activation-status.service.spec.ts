import { TestBed } from '@angular/core/testing';

import { TabActivationStatusService } from './tab-activation-status.service';

describe('TabActivationStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabActivationStatusService = TestBed.get(TabActivationStatusService);
    expect(service).toBeTruthy();
  });
});
