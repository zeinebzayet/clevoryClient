import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesVoucherComponent } from './mes-voucher.component';

describe('MesVoucherComponent', () => {
  let component: MesVoucherComponent;
  let fixture: ComponentFixture<MesVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
