import { TestBed } from '@angular/core/testing';

import { ExamenEseService } from './examen-ese.service';

describe('ExamenEseService', () => {
  let service: ExamenEseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenEseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
