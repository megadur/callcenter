import { TestBed, inject } from '@angular/core/testing';

import { FehlerbildService } from './fehlerbild.service';

describe('FehlerbildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FehlerbildService]
    });
  });

  it('should be created', inject([FehlerbildService], (service: FehlerbildService) => {
    expect(service).toBeTruthy();
  }));
});
