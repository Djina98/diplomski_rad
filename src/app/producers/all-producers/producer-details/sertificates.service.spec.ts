import { TestBed } from '@angular/core/testing';

import { SertificatesService } from './sertificates.service';

describe('SertificatesService', () => {
  let service: SertificatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SertificatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
