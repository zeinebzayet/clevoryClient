import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexLayoutComponent } from './index-layout.component';

describe('IndexLayoutComponent', () => {
  let component: IndexLayoutComponent;
  let fixture: ComponentFixture<IndexLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
