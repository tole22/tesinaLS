import { TestBed } from '@angular/core/testing';

import { ReportedPagesService } from './reported-pages.service';

describe('ReportedPagesService', () => {
  let service: ReportedPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportedPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
