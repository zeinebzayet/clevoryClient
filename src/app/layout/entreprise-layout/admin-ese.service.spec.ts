import { TestBed } from '@angular/core/testing';

import { AdminEseService } from './admin-ese.service';

describe('AdminEseService', () => {
  let service: AdminEseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
