import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEseComponent } from './client-ese.component';

describe('ClientEseComponent', () => {
  let component: ClientEseComponent;
  let fixture: ComponentFixture<ClientEseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
