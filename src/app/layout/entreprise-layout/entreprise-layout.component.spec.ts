import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseLayoutComponent } from './entreprise-layout.component';

describe('EntrepriseLayoutComponent', () => {
  let component: EntrepriseLayoutComponent;
  let fixture: ComponentFixture<EntrepriseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepriseLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepriseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
