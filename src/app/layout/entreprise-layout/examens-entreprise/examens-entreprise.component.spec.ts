import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamensEntrepriseComponent } from './examens-entreprise.component';

describe('ExamensEntrepriseComponent', () => {
  let component: ExamensEntrepriseComponent;
  let fixture: ComponentFixture<ExamensEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamensEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamensEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
