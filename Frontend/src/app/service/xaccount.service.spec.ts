import { TestBed, inject } from '@angular/core/testing';

import { XAccountService } from './xaccount.service';

describe('XAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XAccountService]
    });
  });

  it('should be created', inject([XAccountService], (service: XAccountService) => {
    expect(service).toBeTruthy();
  }));
});
