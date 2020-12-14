import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarUsuarioConfiguracionComponent } from './auxiliar-usuario-configuracion.component';

describe('AuxiliarUsuarioConfiguracionComponent', () => {
  let component: AuxiliarUsuarioConfiguracionComponent;
  let fixture: ComponentFixture<AuxiliarUsuarioConfiguracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarUsuarioConfiguracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarUsuarioConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
