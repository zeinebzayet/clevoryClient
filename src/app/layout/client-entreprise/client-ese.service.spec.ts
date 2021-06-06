import { TestBed } from '@angular/core/testing';

import { ClientEseService } from './client-ese.service';

describe('ClientEseService', () => {
  let service: ClientEseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientEseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
