import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamensClientComponent } from './examens-client.component';

describe('ExamensClientComponent', () => {
  let component: ExamensClientComponent;
  let fixture: ComponentFixture<ExamensClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamensClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamensClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
