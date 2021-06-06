import { TestBed } from '@angular/core/testing';

import { ProfilAdminService } from './profil-admin.service';

describe('ProfilAdminService', () => {
  let service: ProfilAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
