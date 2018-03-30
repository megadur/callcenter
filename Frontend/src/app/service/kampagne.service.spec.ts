import { TestBed, inject } from '@angular/core/testing';

import { KampagneService } from './kampagne.service';

describe('KampagneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KampagneService]
    });
  });

  it('should be created', inject([KampagneService], (service: KampagneService) => {
    expect(service).toBeTruthy();
  }));
});
