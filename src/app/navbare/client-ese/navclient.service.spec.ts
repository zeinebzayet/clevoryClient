import { TestBed } from '@angular/core/testing';

import { NavclientService } from './navclient.service';

describe('NavclientService', () => {
  let service: NavclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
