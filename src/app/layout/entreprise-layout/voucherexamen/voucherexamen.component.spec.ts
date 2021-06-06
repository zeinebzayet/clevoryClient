import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherexamenComponent } from './voucherexamen.component';

describe('VoucherexamenComponent', () => {
  let component: VoucherexamenComponent;
  let fixture: ComponentFixture<VoucherexamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoucherexamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherexamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
