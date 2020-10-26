
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarInstrumentosEquiposComponent } from './auxiliar-instrumentos-equipos.component';

describe('AuxiliarInstrumentosEquiposComponent', () => {
  let component: AuxiliarInstrumentosEquiposComponent;
  let fixture: ComponentFixture<AuxiliarInstrumentosEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarInstrumentosEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarInstrumentosEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
