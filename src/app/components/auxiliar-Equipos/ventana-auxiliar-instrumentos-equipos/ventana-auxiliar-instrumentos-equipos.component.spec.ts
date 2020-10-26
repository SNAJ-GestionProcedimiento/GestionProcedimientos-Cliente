import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaAuxiliarInstrumentosEquiposComponent } from './ventana-auxiliar-instrumentos-equipos.component';

describe('VentanaAuxiliarInstrumentosEquiposComponent', () => {
  let component: VentanaAuxiliarInstrumentosEquiposComponent;
  let fixture: ComponentFixture<VentanaAuxiliarInstrumentosEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaAuxiliarInstrumentosEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaAuxiliarInstrumentosEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
