import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVoucherExamenComponent } from './demande-voucher-examen.component';

describe('DemandeVoucherExamenComponent', () => {
  let component: DemandeVoucherExamenComponent;
  let fixture: ComponentFixture<DemandeVoucherExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeVoucherExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeVoucherExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
