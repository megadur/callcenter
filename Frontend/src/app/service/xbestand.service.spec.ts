import { TestBed, inject } from '@angular/core/testing';

import { XBestandService } from './xbestand.service';

describe('XBestandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XBestandService]
    });
  });

  it('should be created', inject([XBestandService], (service: XBestandService) => {
    expect(service).toBeTruthy();
  }));
});
