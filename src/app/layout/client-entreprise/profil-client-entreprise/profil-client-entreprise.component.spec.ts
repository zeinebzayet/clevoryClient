import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilClientEntrepriseComponent } from './profil-client-entreprise.component';

describe('ProfilClientEntrepriseComponent', () => {
  let component: ProfilClientEntrepriseComponent;
  let fixture: ComponentFixture<ProfilClientEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilClientEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilClientEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
