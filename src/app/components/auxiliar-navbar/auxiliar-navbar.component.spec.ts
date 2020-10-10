import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarNavbarComponent } from './auxiliar-navbar.component';

describe('AuxiliarNavbarComponent', () => {
  let component: AuxiliarNavbarComponent;
  let fixture: ComponentFixture<AuxiliarNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
