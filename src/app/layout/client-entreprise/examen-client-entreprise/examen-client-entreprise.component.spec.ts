import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenClientEntrepriseComponent } from './examen-client-entreprise.component';

describe('ExamenClientEntrepriseComponent', () => {
  let component: ExamenClientEntrepriseComponent;
  let fixture: ComponentFixture<ExamenClientEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenClientEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenClientEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
