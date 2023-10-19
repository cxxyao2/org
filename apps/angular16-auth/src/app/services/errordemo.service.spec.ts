import { TestBed } from '@angular/core/testing';

import { ErrordemoService } from './errordemo.service';

describe('ErrordemoService', () => {
  let service: ErrordemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrordemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
