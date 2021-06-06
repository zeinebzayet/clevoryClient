import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEntrepriseComponent } from './client-entreprise.component';

describe('ClientEntrepriseComponent', () => {
  let component: ClientEntrepriseComponent;
  let fixture: ComponentFixture<ClientEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
