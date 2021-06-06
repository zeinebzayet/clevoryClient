import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { comptesComponent } from './comptes.component';

describe('comptesComponent', () => {
  let component: comptesComponent;
  let fixture: ComponentFixture<comptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ comptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(comptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


