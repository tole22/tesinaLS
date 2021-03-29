import { TestBed } from '@angular/core/testing';

import { PageStructureService } from './pageStructure.service';

describe('PageStructureService', () => {
  let service: PageStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
