import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesvoucherexamenComponent } from './mesvoucherexamen.component';

describe('MesvoucherexamenComponent', () => {
  let component: MesvoucherexamenComponent;
  let fixture: ComponentFixture<MesvoucherexamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesvoucherexamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesvoucherexamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
