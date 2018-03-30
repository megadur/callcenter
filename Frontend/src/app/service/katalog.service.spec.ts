import { TestBed, inject } from '@angular/core/testing';

import { KatalogService } from './katalog.service';

describe('KatalogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KatalogService]
    });
  });

  it('should be created', inject([KatalogService], (service: KatalogService) => {
    expect(service).toBeTruthy();
  }));
});
