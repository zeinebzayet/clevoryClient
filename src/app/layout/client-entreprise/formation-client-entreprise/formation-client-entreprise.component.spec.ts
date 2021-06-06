import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationClientEntrepriseComponent } from './formation-client-entreprise.component';

describe('FormationClientEntrepriseComponent', () => {
  let component: FormationClientEntrepriseComponent;
  let fixture: ComponentFixture<FormationClientEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationClientEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationClientEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
