import { TestBed, inject } from '@angular/core/testing';

import { NutzerService } from './nutzer.service';

describe('NutzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NutzerService]
    });
  });

  it('should be created', inject([NutzerService], (service: NutzerService) => {
    expect(service).toBeTruthy();
  }));
});
