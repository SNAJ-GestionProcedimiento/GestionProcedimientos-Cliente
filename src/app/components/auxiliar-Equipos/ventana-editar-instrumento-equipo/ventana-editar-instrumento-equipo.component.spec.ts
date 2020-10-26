import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaEditarInstrumentoEquipoComponent } from './ventana-editar-instrumento-equipo.component';

describe('VentanaEditarInstrumentoEquipoComponent', () => {
  let component: VentanaEditarInstrumentoEquipoComponent;
  let fixture: ComponentFixture<VentanaEditarInstrumentoEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaEditarInstrumentoEquipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaEditarInstrumentoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
