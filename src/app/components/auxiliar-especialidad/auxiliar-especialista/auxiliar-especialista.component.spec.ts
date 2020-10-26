import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarEspecialistaComponent } from './auxiliar-especialista.component';

describe('AuxiliarEspecialistaComponent', () => {
  let component: AuxiliarEspecialistaComponent;
  let fixture: ComponentFixture<AuxiliarEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
