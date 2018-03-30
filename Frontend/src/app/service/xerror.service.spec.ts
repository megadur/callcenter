import { TestBed, inject } from '@angular/core/testing';

import { XErrorService } from './xerror.service';

describe('XErrorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [XErrorService]
        });
    });

    it('should be created', inject([XErrorService], (service: XErrorService) => {
        expect(service).toBeTruthy();
    }));
});
