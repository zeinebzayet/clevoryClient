import { TestBed } from '@angular/core/testing';

import { FormationEseService } from './formation-ese.service';

describe('FormationEseService', () => {
  let service: FormationEseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationEseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
