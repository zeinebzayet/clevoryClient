import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationsClientComponent } from './formations-client.component';

describe('FormationsClientComponent', () => {
  let component: FormationsClientComponent;
  let fixture: ComponentFixture<FormationsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationsClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
