import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandevoucherComponent } from './demandevoucher.component';

describe('DemandevoucherComponent', () => {
  let component: DemandevoucherComponent;
  let fixture: ComponentFixture<DemandevoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandevoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandevoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
