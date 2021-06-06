import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeExamClientComponent } from './demande-exam-client.component';

describe('DemandeExamClientComponent', () => {
  let component: DemandeExamClientComponent;
  let fixture: ComponentFixture<DemandeExamClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeExamClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeExamClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
