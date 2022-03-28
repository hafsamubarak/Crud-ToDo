import { TestBed } from '@angular/core/testing';

import { AuthentictionService } from './authentiction.service';

describe('AuthentictionService', () => {
  let service: AuthentictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
