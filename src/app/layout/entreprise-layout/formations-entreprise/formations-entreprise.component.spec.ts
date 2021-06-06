import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsEntrepriseComponent } from './formations-entreprise.component';

describe('FormationsEntrepriseComponent', () => {
  let component: FormationsEntrepriseComponent;
  let fixture: ComponentFixture<FormationsEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationsEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationsEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
