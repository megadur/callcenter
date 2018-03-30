import { TestBed, inject } from '@angular/core/testing';

import { XAuftragService } from './xauftrag.service';

describe('XAuftragService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XAuftragService]
    });
  });

  it('should be created', inject([XAuftragService], (service: XAuftragService) => {
    expect(service).toBeTruthy();
  }));
});
