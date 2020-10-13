import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaAuxiliarEspecialidadComponent } from './ventana-auxiliar-especialidad.component';

describe('VentanaAuxiliarEspecialidadComponent', () => {
  let component: VentanaAuxiliarEspecialidadComponent;
  let fixture: ComponentFixture<VentanaAuxiliarEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaAuxiliarEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaAuxiliarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
